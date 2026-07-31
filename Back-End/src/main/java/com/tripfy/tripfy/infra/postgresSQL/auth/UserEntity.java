package com.tripfy.tripfy.infra.postgresSQL.auth;

import com.tripfy.tripfy.auth.model.UserRole;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(insertable = false)
    private UserRole role;

    @Column(name = "status_active", insertable = false)
    private boolean statusActive;

    @Column(name = "date_created", insertable = false, updatable = false)
    private java.time.OffsetDateTime dateCreated;

    @Column(name = "date_updated", insertable = false, updatable = false)
    private java.time.OffsetDateTime dateUpdated;

    protected UserEntity() {}

    public UserEntity(Long id, String username, String password, String name, UserRole role, boolean statusActive) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.name = name;
        this.role = role;
        this.statusActive = statusActive;
    }

    public UserEntity(String username, String password, String name) {
        this.username = username;
        this.password = password;
        this.name = name;
    }

    public Long getId() { return id; }
    public String getUsername() { return username; }
    public String getPassword() { return password; }
    public String getName() { return name; }
    public UserRole getRole() { return role; }
    public boolean isStatusActive() { return statusActive; }
    public java.time.OffsetDateTime getDateCreated() { return dateCreated; }
    public java.time.OffsetDateTime getDateUpdated() { return dateUpdated; }
}
