package com.behrouz.dashboardpanel.strategy;

import io.netty.util.internal.StringUtil;

/**
 * Created by Hapi
 * 13 September 2018 10:55
 **/
public class StrategyGenerator {

    private static final int ACCOUNTING_NUMBER_LENGTH = 12;



    public static String generateAccountingNumber() {

        return StringGenerator.generateDigit( ACCOUNTING_NUMBER_LENGTH );

    }


    public static String generateInvitingCode( String mobile ) {

        if ( !StringUtil.isNullOrEmpty( mobile ) ) {

            long numericMobile = Long.parseLong( mobile );

            return Long.toHexString( numericMobile );

        }

        return null;

    }


    public static String generateCustomerApplicationToken() {

        return StringGenerator.generateToken(32);

    }


    public static String generateOperatorToken() {

        return StringGenerator.generateToken(32);

    }


    public static String generateInvitingCodeLink( String invitingCode ) {

        return String.format( "http://domain.ir/invite?code=%s", invitingCode );

    }


    public static String generateDownloadLink() {

        return "https://behtatahvie.com";

    }


    public static String generateBillTrackingCode( int customerId ) {

        return StringGenerator.generateDigit(12);

    }


    public static String generateCallSupportTrackingCode () {

        return StringGenerator.generateDigit(12);

    }


    public static String generateOffCode () {

        return StringGenerator.generateToken(5);

    }
}
