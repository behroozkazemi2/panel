package com.behrouz.dashboardpanel.util;
import java.io.UnsupportedEncodingException;
import java.util.Base64;

public class ImageUtilBase64 {
    public static byte[] getByteArrayToByte64(String  st) {
        try {
            return Base64.getDecoder().decode(st.getBytes("UTF-8"));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return null;
    }
}
