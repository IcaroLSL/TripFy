package com.tripfy.tripfy;

import org.springframework.boot.SpringApplication;

public class TestTripfyApplication {

	public static void main(String[] args) {
		SpringApplication.from(TripfyApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
