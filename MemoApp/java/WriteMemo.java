package com.example.myapplication;

import android.os.Bundle;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import com.example.myapplication.room.AppDatabase;
import com.example.myapplication.room.User;

public class WriteMemo extends AppCompatActivity {
    Toolbar myToolbar;
    private final int REQUEST_CODE = 200;
    private EditText description;
    private TextView result;
    private AppDatabase db;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.writememo);

        initialized();
        }

        private void initialized(){
        description = findViewById(R.id.description);
        result = findViewById(R.id.result);

        db = AppDatabase.getInstance(this);

        }
        public boolean onCreateOptionsMenu(Menu menu){
            MenuInflater inflater = getMenuInflater();
            inflater.inflate(R.menu.menu_main,menu);
            return true;
        }
        public boolean onOptionsItemSelected(MenuItem item){
        switch (item.getItemId()){
                case R.id.save:
                    make_title();
            default:
                return super.onOptionsItemSelected(item);
            }
        }
    private void make_title(){
        EditText editText = new EditText(getApplicationContext());
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("제목을 입력하세요.");
        builder.setView(editText);

        builder.setPositiveButton("저장",(dialog, which) -> {
            String s = editText.getText().toString();

            User memo = new User(s, description.getText().toString());
            db.userDao().insert(memo);
            Toast.makeText(getApplicationContext(),"저장되었습니다.",Toast.LENGTH_SHORT).show();
            dialog.dismiss();

            finish();
        });

        builder.setNegativeButton("취소",(dialog, which) -> {
            dialog.dismiss();
        });
        builder.show();
    }
}