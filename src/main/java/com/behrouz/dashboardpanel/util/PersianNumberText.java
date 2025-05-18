package com.behrouz.dashboardpanel.util;

import java.util.HashMap;

/**
 * Created by Reza ( Old Server, No Changes )
 * Package ir.mobintabaran.mehan.server.util
 * Project mehanserver
 * 22 July 2018 10:17
 **/

public class PersianNumberText {

    public final static HashMap<Character , String> alphabet = new HashMap(  ){{
        put( '0' , "۰") ;
        put( '1' , "۱") ;
        put( '2' , "۲") ;
        put( '3' , "۳") ;
        put( '4' , "۴") ;
        put( '5' , "۵") ;
        put( '6' , "۶") ;
        put( '7' , "۷") ;
        put( '8' , "۸") ;
        put( '9' , "۹");
    }};

    public final static HashMap<String, Character> numbers = new HashMap(  ){{
        put(  "۰" , '0' ) ;
        put(  "۱" , '1' ) ;
        put(  "۲" , '2' ) ;
        put(  "۳" , '3' ) ;
        put(  "۴" , '4' ) ;
        put(  "۵" , '5' ) ;
        put(  "۶" , '6' ) ;
        put(  "۷" , '7' ) ;
        put(  "۸" , '8' ) ;
        put(  "۹" , '9' ) ;
    }};



    public static String replaceAllPersianNumber(String msg){

        StringBuilder builder = new StringBuilder(  );

        for(char c : msg.toCharArray()){
            if(numbers.containsKey( c + "" )){
                builder.append( numbers.get( c + "" ) );
            }else{
                builder.append( c );
            }
        }

        return builder.toString();

    }

    public static String toPersianNumber(String msg){

        StringBuilder builder = new StringBuilder(  );

        for(char c : msg.toCharArray()){
            if(alphabet.containsKey( c )){
                builder.append( alphabet.get( c ) );
            }else{
                builder.append( c );
            }
        }

        return builder.toString();

    }

    public static String toRtl(String msg){
        String ans = new String( "" );

        for(char c : msg.toCharArray()){
            ans = new String( c + ans );
        }

        return ans;
    }

    public static String replaceAllExceptNumber(String text){

        StringBuilder builder = new StringBuilder(  );

        for(int i = 0 ; i < text.length() ; ++i){
            String u = "" + text.charAt( i );
            if( ('0' <= text.charAt( i ) && text.charAt( i ) <= '9' ) || numbers.containsKey( u )){
                builder.append( u );
            }
        }

        return builder.toString();

    }


    public static String reversDate(String date){

        String []seg = date.split( "/" );

        return String.format( "%s/%s/%s" ,
                seg[2],
                seg[1],
                seg[0]
        );
    }
}
