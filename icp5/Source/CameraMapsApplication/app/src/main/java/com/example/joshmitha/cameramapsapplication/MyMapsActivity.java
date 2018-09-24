package com.example.joshmitha.geomapsapplication;


import android.Manifest;
import android.support.v4.app.FragmentActivity;
import android.os.Bundle;
import android.content.Context;
import android.location.Address;
import android.content.pm.PackageManager;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.FragmentActivity;
import android.os.Bundle;
import android.widget.Toast;


import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.gms.maps.model.LatLngBounds;

import java.util.List;

public class MapsActivity extends FragmentActivity implements OnMapReadyCallback {

    private GoogleMap mMap;
    public Geocoder geocoder;
    public double lat;
    public double log;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_maps);
        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);
    }


    /**
     * Manipulates the map once available.
     * This callback is triggered when the map is ready to be used.
     * This is where we can add markers or lines, add listeners or move the camera. In this case,
     * we just add a marker near Sydney, Australia.
     * If Google Play services is not installed on the device, the user will be prompted to install
     * it inside the SupportMapFragment. This method will only be triggered once the user has
     * installed Google Play services and returned to the app.
     */
    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;
        geocoder = new Geocoder(this);
        LocationManager currentlocation = (LocationManager)this.getSystemService(Context.LOCATION_SERVICE);
        // Add a marker in Sydney and move the camera
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            Toast.makeText(getApplicationContext(), "enable   location", Toast.LENGTH_LONG).show();
            return;
        }
        Location mylocation = currentlocation.getLastKnownLocation(LocationManager.NETWORK_PROVIDER);
        LatLng location = new LatLng(mylocation.getLatitude(),mylocation.getLongitude());
        lat= mylocation.getLatitude();
        log= mylocation.getLongitude();
        mMap.addMarker(new MarkerOptions().position(location).title("location: Lat"+""+Double.toString((lat))+" "+"Long"+ Double.toString(log)));
        mMap.moveCamera(CameraUpdateFactory.newLatLng(location));
       /* Toast.makeText(getApplicationContext(), "Lat"+ location.latitude, Toast.LENGTH_LONG).show();
       /* Toast.makeText(getApplicationContext(), "Long"+ location.longitude, Toast.LENGTH_LONG).show();
       /* Toast.makeText(getApplicationContext(), "Long"+ location, Toast.LENGTH_LONG).show();*/

    }
}