import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";

export default function GeoCoder({allStudent}){
    //let geocoder = new google.maps.Geocoder();
    const center = useMemo(() => ({ lat: 34.126374, lng: -80.883734 }), []);
    return(
    <>
        <input type="button" value="Encode"></input>
    </>
    )
}