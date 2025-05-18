package com.behrouz.dashboardpanel.okhttp.base;

import java.util.logging.Logger;

/**
 * Created by Hapi on 2017/06/20.
 * Project: taxi8
 * package : com.sepehr.mobin.taxi8.utils
 */
public class KoalaEncryption extends Encryption {

    protected static final Logger logger = Logger.getLogger( KoalaEncryption.class.getName());

    private String sharedKey    = "Hapi8J8888888";

    private String sharedVI     = "HapiKazemi888888";




    protected String getSharedKey() {
        return sharedKey;
    }

    protected String getSharedVI() {
        return sharedVI;
    }
}
