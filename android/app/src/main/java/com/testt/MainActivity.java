package com.testt;

import com.facebook.react.ReactActivity;
import android.os.Bundle;  //add
import org.devio.rn.splashscreen.SplashScreen; //add

public class MainActivity extends ReactActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // <--添加这一句
        super.onCreate(savedInstanceState);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "testT";
    }
}
