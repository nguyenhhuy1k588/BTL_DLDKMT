import "./ExploreContainer.css";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardSubtitle,
} from "@ionic/react";
import {
  thermometerOutline,
  waterOutline,
  sunnyOutline,
  moonOutline,
} from "ionicons/icons";
import { Suspense, useEffect, useState } from "react";
import instance from "../service/axios";
import io from "socket.io-client";

interface ContainerProps {}
type myData = {
  Temperature: Number;
  Humidity: Number;
  Light: Number;
  Lightsensor: Number;
};

const socket = io("https://esp8266-smartapp.herokuapp.com/", {transports: ['websocket']});

const DHTSensorInfo: React.FC<ContainerProps> = () => {
  const [allData, setAllData] = useState<myData>({
    Temperature: 0,
    Humidity: 0,
    Light: 0,
    Lightsensor: 0,
  });
  
  socket.on("all data", function (val) {
    setAllData(val);
  });

  useEffect(() => {
    instance
      .get("all")
      .then((res) => setAllData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="ion-margin-start ion-margin-top">
        Giá trị cảm biến DHT11
      </div>
      <IonGrid>
        <IonRow>
          <IonCol className="ion-text-center">
            <IonCard>
              <IonCardHeader>
                <IonIcon
                  className="ion-icon-temp"
                  size="large"
                  icon={thermometerOutline}
                ></IonIcon>
              </IonCardHeader>
              <IonCardContent>
                <div>Nhiệt độ: {allData.Temperature}</div>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol className="ion-text-center">
            <IonCard>
              <IonCardHeader>
                <IonIcon
                  className="ion-icon-humid"
                  size="large"
                  icon={waterOutline}
                ></IonIcon>
              </IonCardHeader>
              <IonCardContent>
                <div>Độ ẩm: {allData.Humidity}%</div>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol className="ion-text-center">
            <IonCard>
              <IonCardHeader>
                <IonIcon
                  className="ion-icon-bulb"
                  size="large"
                  icon={allData.Lightsensor === 1 ? sunnyOutline : moonOutline}
                ></IonIcon>
                <IonCardSubtitle>
                  Giá trị quang điện trở: {allData.Lightsensor}
                </IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <div>
                  {allData.Lightsensor === 1
                    ? "Bạn nên tắt đèn"
                    : "Bạn nên bật đèn"}
                </div>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </Suspense>
  );
};

export default DHTSensorInfo;
