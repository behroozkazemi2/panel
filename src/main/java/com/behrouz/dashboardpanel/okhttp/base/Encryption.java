package com.behrouz.dashboardpanel.okhttp.base;

import com.behrouz.dashboardpanel.strategy.StringGenerator;
import com.behrouz.dashboardpanel.okhttp.exception.ApiActionEncryptionException;
import org.apache.tomcat.util.codec.binary.Base64;

import javax.crypto.Cipher;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

/**
 * created by: Hapi
 **/


public class Encryption {

    private static final String sharedKey = "Hapi8J8888888";

    private static final String sharedVI = "HapiKazemi888888";


    protected static String getSha(String toHash) throws NoSuchAlgorithmException {
        String hashed = null;
        MessageDigest md = MessageDigest.getInstance("SHA-1");
        byte[] bytes = md.digest(toHash.getBytes());
        StringBuilder sb = new StringBuilder();
        for (byte aByte : bytes) {
            sb.append(Integer.toString((aByte & 0xff) + 0x100, 16).substring(1));
        }
        hashed = sb.toString();

        return hashed;
    }

    public String encrypt(String data) throws NoSuchAlgorithmException {
        String salted = concatSalt(data);
        String hashed = getSha(salted);
        byte[] key = generateKey(hashed);
        return mixWithHash(hashed, encryptByAES(key, salted));
    }

    /**
     * @param data
     * @return
     * @apiNote We Test This method execute in 1-5 ms
     */
    public String decrypt(String data) throws Exception{
        String[] extracted = extractFromHash(data);
        String hashed = extracted[0];
        String encrypted = extracted[1];

        byte[] key = generateKey(hashed);
        String withSalt = decryptByAES(key, encrypted);
        return removeSalt(withSalt);
    }

    protected String mixWithHash(String hashed, String data) {
        return hashed + data;
    }

    protected String[] extractFromHash(String data) {
        String hashed = data.substring(0, 40);
        return new String[]{hashed, data.substring(40)};
    }

    protected byte[] generateKey(String hashed) {
        PBEKeySpec spec = new PBEKeySpec(sharedKey.toCharArray(), hashed.getBytes(), 54, 128);
        byte[] hash = new byte[0];
        try {
            SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
            hash = skf.generateSecret(spec).getEncoded();
        } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
            e.printStackTrace();
        }
        return hash;
    }

    protected String concatSalt(String data) {
        return StringGenerator.generateSalt() + data;
    }

    protected String removeSalt(String data) {
        return data.substring(64);
    }

    protected String encryptByAES(byte[] key, String data) {
        try {
            IvParameterSpec iv = new IvParameterSpec(sharedVI.getBytes("UTF-8"));
            SecretKeySpec sKeySpec = new SecretKeySpec(key, "AES");
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
            cipher.init(Cipher.ENCRYPT_MODE, sKeySpec, iv);
            byte[] encrypted = cipher.doFinal(data.getBytes());
            return Base64.encodeBase64String(encrypted);
        } catch (Exception ex) {
            ex.printStackTrace();
        }

        return null;
    }

    protected String decryptByAES(byte[] key, String encrypted) throws ApiActionEncryptionException {
        try {
            IvParameterSpec iv = new IvParameterSpec(sharedVI.getBytes("UTF-8"));
            SecretKeySpec sKeySpec = new SecretKeySpec(key, "AES");
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
            cipher.init(Cipher.DECRYPT_MODE, sKeySpec, iv);
            byte[] data = cipher.doFinal( Base64.decodeBase64(encrypted));
            return new String(data);
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new ApiActionEncryptionException();
        }
    }

    //TripleDES encryption
    public String TripleDESEncrypt(byte []key,String message) throws Exception {
        try {
            System.out.printf("key: %s \t,\tdata: %s\n",key.toString(),message);
            IvParameterSpec iv = new IvParameterSpec(new byte[8]);
            SecretKeySpec sKeySpec = new SecretKeySpec(key, "DESede");
            Cipher cipher = Cipher.getInstance("DESede/ECB/PKCS5Padding");
            cipher.init(Cipher.ENCRYPT_MODE, sKeySpec);
            byte[] encrypted = cipher.doFinal(message.getBytes("utf-8"));
            return Base64.encodeBase64String(encrypted);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

}
