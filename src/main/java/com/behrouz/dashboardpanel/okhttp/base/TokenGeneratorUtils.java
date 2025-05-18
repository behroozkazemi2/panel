package com.behrouz.dashboardpanel.okhttp.base;
import java.util.Random;

/**
 * Created by thunderbolt on 7/2/17.
 */

class TokenGeneratorUtils {

    private static String generate(int tokenLength, String characters) {
        StringBuilder salt = new StringBuilder();
        Random rnd = new Random();
        while (salt.length() < tokenLength) {
            int index = (int) (rnd.nextFloat() * characters.length());
            salt.append(characters.charAt(index));
        }
        return salt.toString();
    }

    private static String generate(int tokenLength) {
        return generate(tokenLength, "abcdefghijklmnopqrstuvwxyz1234567890");
    }

    private static String generateDigit(int tokenLength) {
        return generate(tokenLength, "1234567890");
    }

    public static String generatePassword() {
        return generateDigit(6);
    }

    public static String generateToken() {
        return generate(30);
    }

    static String generateSalt() {
        return generate(64);
    }
}
