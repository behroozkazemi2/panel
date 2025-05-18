package com.behrouz.dashboardpanel.configuration;

import com.behrouz.dashboardpanel.util.StringUtil;
import com.behrouz.dashboardpanel.configuration.data.PanelHeaderResponse;
import com.behrouz.dashboardpanel.security.model.OperatorSessionDetail;
import com.behrouz.dashboardpanel.security.model.SessionHolder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


/**
 * Created by Hapi
 * 24 September 2018 16:25
 **/

@Configuration
public class ConstantConfiguration {

    @Bean(name = "superVisor")
    public SuperVisorListener getSuperVisor(){
        return SessionHolder::isSuperVisor;
    }

    @Bean(name = "userHeaderDetail")
    public UserHeaderDetail getUserHeaderDetail(){
        return () -> {
            OperatorSessionDetail session = SessionHolder.getOperatorSessionDetail();
            if(session == null){
                return null;
            }
            return new PanelHeaderResponse(session);
        };
    }

    @Bean(name = "fullName")
    public StringListener fullName(){
        return () -> {
            final OperatorSessionDetail session = SessionHolder.getOperatorSessionDetail();
            if(session == null ){
                return "-";
            }
            return  (StringUtil.isNullOrEmpty(session.getFirstName()) ? "-" : session.getFirstName()) +
                    " " +
                    (StringUtil.isNullOrEmpty(session.getLastName()) ? "-" : session.getLastName());
        };
    }

    @Bean(name = "firstName")
    public StringListener firstName(){
        return () -> {
            final OperatorSessionDetail session = SessionHolder.getOperatorSessionDetail();
            if(session == null || StringUtil.isNullOrEmpty(session.getFirstName())){
                return "-";
            }
            return session.getFirstName();
        };
    }

    @Bean(name = "lastName")
    public StringListener lastName(){
        return () -> {
            final OperatorSessionDetail session = SessionHolder.getOperatorSessionDetail();
            if(session == null || StringUtil.isNullOrEmpty(session.getLastName())){
                return "-";
            }
            return session.getLastName();
        };
    }

    interface UserHeaderDetail{
        PanelHeaderResponse getData();
    }

    public interface PermissionListener {
        boolean hasAccess () ;
    }

    interface SuperVisorListener {
        boolean isSuperVisor () ;
    }

    public interface StringListener {
        String text() ;
    }



}
