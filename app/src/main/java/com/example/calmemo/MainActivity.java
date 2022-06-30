package com.example.calmemo;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.navigation.ui.AppBarConfiguration;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.CalendarView;
import android.widget.PopupMenu;
import android.widget.Toast;

import com.google.android.material.bottomnavigation.BottomNavigationView;

import java.util.Calendar;

public class MainActivity extends AppCompatActivity {
    private AppCompatActivity binding;
    public CalendarView calendarView;
    public CalendarView dayOfMonth;
    public View.OnClickListener onLongClick;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        CalendarView calendar = (CalendarView) findViewById(R.id.CalendarView);

        BottomNavigationView navView = findViewById(R.id.nav_view);
        AppBarConfiguration appBarConfiguration = new AppBarConfiguration.Builder(
                R.id.item1, R.id.item2, R.id.item3, R.id.item4).build();
        final CharSequence[] date = {null};

        calendar.setOnDateChangeListener(new CalendarView.OnDateChangeListener() {
            @Override
            public void onSelectedDayChange(@NonNull CalendarView view, int year, int month, int dayOfMonth) {
                    PopupMenu popup = new PopupMenu(MainActivity.this, view);
                    getMenuInflater().inflate(R.menu.option_menu, popup.getMenu());

                    popup.setOnMenuItemClickListener(new PopupMenu.OnMenuItemClickListener(){
                        public boolean onMenuItemClick(MenuItem item){
                            switch (item.getItemId()){
                                case R.id.Oitem1:
                                    Intent diaryintent = new Intent(getApplicationContext(), DiaryActivity.class);
                                    startActivity(diaryintent);
                                    break;
                                case R.id.Oitem2:
                                    Intent memointent = new Intent(getApplicationContext(), MemoActivity.class);
                                    startActivity(memointent);
                                    break;
                                case R.id.Oitem3:
                                    Intent calendarintent = new Intent(getApplicationContext(), CalendarActivity.class);
                                    startActivity(calendarintent);
                                    break;
                            }
                            return false;
                        }
                    });
                    popup.show();
            }
        });

    }




}