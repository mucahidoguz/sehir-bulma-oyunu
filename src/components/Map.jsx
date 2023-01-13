import React, { useEffect, useRef, useContext } from "react";
import L from "leaflet";
import { cities } from "../data/city";
import { GameContext } from "../context/GameContext";
import { TYPING, CLICKING } from "../../constant";

const Map = ({ cityToBeGuessed, gameType }) => {
  const { isGameOn, setClickedCity } = useContext(GameContext);
  const mapRef = useRef(null);

  const initializeMap = () => {
    mapRef.current = L.map("map").setView([38.505, 35.4], 6);
    L.tileLayer(
      "https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg",
      {
        maxZoom: 18,
        attribution:
          "Map tiles by " +
          "<a href='http://stamen.com'>Stamen Design</a>, under <a" +
          " href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a>" +
          ". Data by " +
          "<a href='http://openstreetmap.org'>OpenStreetMap</a>, under " +
          "<a href='http://creativecommons.org/licenses/by-sa/3.0'>CC BY SA</a>"
      }
    ).addTo(mapRef.current);
  };
  useEffect(() => {
    initializeMap();
  }, []);

  useEffect(() => {
    if (isGameOn) {
      L.geoJSON(cities.features, {
        style: () => {
          return { color: "#000", fillColor: "#00FF00" };
        },
        //feature kullanılmadığımız için feature yazmak yerine _ kullandık
        onEachFeature: (_, layer) => {
          layer.on("click", (e) => {
            setClickedCity(e.target.feature.properties.NAME);
          });
          layer.on("mouseover", () => {
            if (gameType === CLICKING) {
              layer.setStyle({
                fillColor: "#fff"
              });
            }
          });

          layer.on("mouseout", () => {
            if (gameType === CLICKING) {
              layer.setStyle({
                fillColor: "#00FF00"
              });
            }
          });
        }
      }).addTo(mapRef.current);
    } else {
      mapRef.current.eachLayer((layer) => {
        if (layer.feature) {
          mapRef.current.removeLayer(layer);
        }
      });
    }
  }, [isGameOn, gameType]);

  useEffect(() => {
    if (gameType === TYPING) {
      mapRef.current.eachLayer((layer) => {
        if (
          layer.feature &&
          layer.feature.properties.NAME.toLowerCase("tr") ===
            cityToBeGuessed.toLocaleLowerCase("tr")
        ) {
          layer.setStyle({
            fillColor: "#fff",
            fillOpacity: 1
          });
        }
      });
    }

    return () => {
      mapRef.current.eachLayer((layer) => {
        if (layer.feature) {
          layer.setStyle({
            fillColor: "#00FF00",
            fillOpacity: 0.2
          });
        }
      });
    };
  }, [cityToBeGuessed]);
  return <div id="map" className="h-screen w-full z-0"></div>;
};

export default Map;
