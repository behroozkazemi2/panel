package com.behrouz.dashboardpanel.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Hapi
 * 31 October 2019 17:41
 **/
@Controller
@RequestMapping(value = "/admin/setting")
@PreAuthorize("@KrecSecurityComponent.isRoleView('setting')" )
public class SettingController {





}
