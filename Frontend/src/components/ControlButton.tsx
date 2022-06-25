import "./ExploreContainer.css";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonButton,
} from "@ionic/react";
import { bulbOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import instance from "../service/axios";
import { Suspense } from 'react'

interface ContainerProps {}

const ControlButton: React.FC<ContainerProps> = () => {
  const [bulb, setBulb] = useState<number>(0);

  useEffect(() => {
    instance
      .get("all")
      .then((res) => setBulb(res.data.Light))
      .catch((err) => console.log(err));
  }, []);

  const handleChangeBulb = () => {
    setBulb(prev => 1 - prev)
    instance
      .post("led", {
        status: 1 - bulb,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol className="ion-text-center">
              <IonCard>
                <IonCardHeader>
                  <IonIcon
                    className="ion-icon-bulb"
                    size="large"
                    icon={bulbOutline}
                  ></IonIcon>
                </IonCardHeader>
                <IonCardContent>
                  <IonButton
                    color="danger"
                    expand="block"
                    onClick={() => handleChangeBulb()}
                  >
                    {bulb === 0 ? "Bật" : "Tắt"}
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </Suspense>
  );
};

export default ControlButton;
