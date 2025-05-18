package com.behrouz.dashboardpanel.security;

import com.behrouz.dashboardpanel.okhttp.OkHttpHelper;
import com.behrouz.dashboardpanel.okhttp.api.ApiResponseBody;
import com.behrouz.dashboardpanel.okhttp.model.request.ProviderLoginRequest;
import com.behrouz.dashboardpanel.security.captcha.CaptchaAuthenticationDetails;
import com.behrouz.dashboardpanel.security.model.OperatorSessionDetail;
import com.behrouz.dashboardpanel.okhttp.model.response.ProviderLoginResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.util.ArrayList;

/**
 * Created by Hapi
 * 22 Aug 2020 13:15
 **/
@Component
public class AuthenticationProvider implements org.springframework.security.authentication.AuthenticationProvider {

    @Override
    public Authentication authenticate( Authentication authentication)
            throws AuthenticationException {

        if(!(authentication.getDetails() instanceof CaptchaAuthenticationDetails)){
            throw new BadCredentialsException("کد امنیتی وارد نشده است.");
        }


        CaptchaAuthenticationDetails captcha =
                (CaptchaAuthenticationDetails) authentication.getDetails();

        if(!captcha.isCorrect()) {
            throw new BadCredentialsException("کد امنیتی صحیح نمی باشد");
        }

        String username =
                authentication.getName();
        String password =
                authentication.getCredentials().toString();


        return loginAuthentication(username , password);

    }


    private Authentication loginAuthentication( String username, String password) {


        ProviderLoginRequest loginRequest =
                new ProviderLoginRequest(username, password);

        ApiResponseBody<ProviderLoginResponse> loginResponse;
        try {
            loginResponse =
                    OkHttpHelper.login(loginRequest);
            if(!loginResponse.successful()){
                throw new BadCredentialsException(loginResponse.getDescription());
            }

            UsernamePasswordAuthenticationToken token =
                    new UsernamePasswordAuthenticationToken( username, password, new ArrayList <>() );


            OperatorSessionDetail sessionDetail =
                        new OperatorSessionDetail(
                                loginResponse.getData().getId(),
                                loginResponse.getData().getFirstName(),
                                loginResponse.getData().getLastName(),
                                loginResponse.getData().getAddress(),
                                loginResponse.getData().getPhone(),
                                loginResponse.getData().getPhone(),
                                loginResponse.getData().getInstagramId(),
                                loginResponse.getData().getTelegramId(),
                                loginResponse.getData().getAvatar(),
                                loginResponse.getData().getToken(),
                                LocalDateTime.now(),
                                loginResponse.getData().getUsername(),
                                loginResponse.getData().isMaster(),
                                loginResponse.getData().getProviderId()
                        );

            token.setDetails( sessionDetail );
            return token;
        }catch (BadCredentialsException e){
            e.printStackTrace();
            throw new BadCredentialsException(e.getMessage());
        }catch (Exception e){
            e.printStackTrace();
            throw new BadCredentialsException("خطا در برقراری ارتباط با سرور");
        }
    }




    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals( UsernamePasswordAuthenticationToken.class );
    }

}
