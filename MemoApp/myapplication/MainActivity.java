package com.example.myapplication;

import android.content.Intent;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.myapplication.room.AppDatabase;
import com.example.myapplication.room.User;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

import java.util.ArrayList;
import java.util.List;


public class MainActivity extends AppCompatActivity {

    private final int WRITE_MEMO = 1;
    private FloatingActionButton add;

    private RecyclerView recyclerView;
    private LinearLayoutManager linearLayoutManager;
    private RecyclerAdapter adapter;
    private List<User> users;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        initialized();

        recyclerView.setLayoutManager(linearLayoutManager);
        recyclerView.setAdapter(adapter);

        add.setOnClickListener(v -> {
            move();
        });

    }
    private void initialized() {
        add = findViewById(R.id.addMemo);

        recyclerView = findViewById(R.id.mainRecyclerView);
        linearLayoutManager = new LinearLayoutManager(this);
        adapter = new RecyclerAdapter();

        users = AppDatabase.getInstance(this).userDao().getAll();
        int size = users.size();
        for(int i = 0; i < size; i++){
            adapter.addItem(users.get(i));
        }
    }
    private void move() {
        Intent intent = new Intent(getApplicationContext(), WriteMemo.class);
        startActivity(intent);
    }

    protected void onStart(){
        users = AppDatabase.getInstance(this).userDao().getAll();
        adapter.addItems((ArrayList) users);
        super.onStart();
    }


}
