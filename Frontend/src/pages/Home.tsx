import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ControlButton from '../components/ControlButton';
import ExploreContainer from '../components/DHTSensorInfo';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>ESP8266 Smart Control</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
        <ControlButton />
      </IonContent>
    </IonPage>
  );
};

export default Home;
