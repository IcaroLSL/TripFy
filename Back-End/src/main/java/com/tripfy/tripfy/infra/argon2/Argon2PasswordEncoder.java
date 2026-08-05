package com.tripfy.tripfy.infra.argon2;

import com.tripfy.tripfy.auth.gateway.PasswordEncoder;
import org.bouncycastle.crypto.generators.Argon2BytesGenerator;
import org.bouncycastle.crypto.params.Argon2Parameters;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Base64;

@Component
public class Argon2PasswordEncoder implements PasswordEncoder {

    private static final int SALT_LENGTH = 16;
    private static final int HASH_LENGTH = 32;
    private static final int ITERATIONS = 3;
    private static final int MEMORY_KB = 65536;
    private static final int PARALLELISM = 1;

    private final SecureRandom secureRandom = new SecureRandom();

    @Override
    public String encode(String rawPassword) {
        byte[] salt = new byte[SALT_LENGTH];
        secureRandom.nextBytes(salt);

        byte[] hash = hash(rawPassword, salt);

        return String.format(
                "$argon2id$v=19$m=%d,t=%d,p=%d$%s$%s",
                MEMORY_KB, ITERATIONS, PARALLELISM,
                Base64.getEncoder().withoutPadding().encodeToString(salt),
                Base64.getEncoder().withoutPadding().encodeToString(hash)
        );
    }

    @Override
    public boolean matches(String rawPassword, String encodedPassword) {
        String[] parts = encodedPassword.split("\\$");
        if (parts.length != 6) {
            return false;
        }

        byte[] salt = Base64.getDecoder().decode(parts[4]);
        byte[] expectedHash = Base64.getDecoder().decode(parts[5]);

        byte[] actualHash = hash(rawPassword, salt, expectedHash.length);

        return java.security.MessageDigest.isEqual(expectedHash, actualHash);
    }

    private byte[] hash(String rawPassword, byte[] salt) {
        return hash(rawPassword, salt, HASH_LENGTH);
    }

    private byte[] hash(String rawPassword, byte[] salt, int length) {
        Argon2Parameters params = new Argon2Parameters.Builder(Argon2Parameters.ARGON2_id)
                .withVersion(Argon2Parameters.ARGON2_VERSION_13)
                .withIterations(ITERATIONS)
                .withMemoryAsKB(MEMORY_KB)
                .withParallelism(PARALLELISM)
                .withSalt(salt)
                .build();

        Argon2BytesGenerator generator = new Argon2BytesGenerator();
        generator.init(params);

        byte[] result = new byte[length];
        generator.generateBytes(rawPassword.getBytes(StandardCharsets.UTF_8), result);
        return result;
    }
}
