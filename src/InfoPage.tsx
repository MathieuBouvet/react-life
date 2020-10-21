import React from "react";
import styled from "styled-components";
import {
  StartButton,
  PauseButton,
  NextGenButton,
  ClearButton,
  RedoButton,
  UndoButton,
  ArrowButton,
} from "./ui/Buttons";
import ZoomLevel from "./ui/ZoomLevel";
import { Selector } from "./ui/Selector";

type InfoPageProps = { visible: boolean };

const StyledInfoPage = styled.div<InfoPageProps>`
  position: absolute;
  width: 100vw;
  height: ${props => `calc(100vh - ${props.theme.headerHeight})`};
  background-color: ${props => props.theme.colors.light};
  top: ${props => props.theme.headerHeight};
  left: 0;
  transform: ${props => `translateX(${props.visible ? 0 : "100vw"})`};
  transition: transform 500ms;
  overflow-y: auto;
`;

const ButtonDisplay = styled.div`
  background-color: ${props => props.theme.colors.primaryDark};
  width: 100px;
  height: 100px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 6px;
  flex: auto 0 0;
`;

const ControlDisplay = styled.div`
  background-color: ${props => props.theme.colors.primaryDark};
  padding: 25px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 6px;
`;

const ButtonInfo = styled.div`
  display: flex;
  align-items: center;
`;

const InfoWrapper = styled.div`
  width: 75vw;
  max-width: 1024px;
  margin: auto;
`;

const InfoPage = (props: InfoPageProps) => (
  <StyledInfoPage {...props}>
    <InfoWrapper>
      <h2>C'est quoi React Life ?</h2>
      <p>
        React Life est une implementation du <b>jeu de la vie</b>.
      </p>
      <p>
        Le jeu de la vie est un automate cellulaire inventé par par John Horton
        Conway en 1970.{" "}
      </p>
      <p>
        Pour plus d'informations sur le jeu de la vie, voici la page wikipedia :{" "}
        <a href="https://fr.wikipedia.org/wiki/Jeu_de_la_vie">
          le jeu de la vie sur wikipedia
        </a>{" "}
        et une excellente vidéo youtube :{" "}
        <a href="https://www.youtube.com/watch?v=S-W0NX97DB0">
          le jeu de la vie expliqué par science etonnante
        </a>
      </p>

      <h2>Comment utiliser React Life ?</h2>
      <h3>Les contrôles :</h3>
      <p>
        <b>Cliquer</b> pour activer ou désactiver une cellule
      </p>
      <p>
        Maintenir le <b>clic</b> et <b>déplacer</b> la souris pour activer des
        cellule rapidement
      </p>
      <p>
        Utiliser la <b>molette</b> de la souris pour zoomer ou dézoomer, à
        l'endroit pointé par la souris
      </p>
      <p>
        Utiliser les <b>fèches directionelles</b> du clavier pour déplacer la
        grille
      </p>
      <h3>La barre d'outils :</h3>
      <ButtonInfo>
        <ButtonDisplay>
          <StartButton dispatch={() => {}} />
        </ButtonDisplay>
        Lance la simulation
      </ButtonInfo>
      <ButtonInfo>
        <ButtonDisplay>
          <PauseButton dispatch={() => {}} />
        </ButtonDisplay>
        Met la simulation en pause
      </ButtonInfo>
      <ButtonInfo>
        <ButtonDisplay>
          <NextGenButton dispatch={() => {}} />
        </ButtonDisplay>
        Avance à la génration suivante et s'arrête
      </ButtonInfo>
      <ButtonInfo>
        <ButtonDisplay>
          <ClearButton dispatch={() => {}} />
        </ButtonDisplay>
        Efface toute la grille
      </ButtonInfo>
      <ButtonInfo>
        <ButtonDisplay>
          <UndoButton dispatch={() => {}} />
        </ButtonDisplay>
        <div>et</div>
        <ButtonDisplay>
          <RedoButton dispatch={() => {}} />
        </ButtonDisplay>
        <div>
          Permetent d'annuler ou de rétablir la dernière action sur les cellules
          de la grille. Permet aussi de se déplacer entre les générations, mais
          seulement celles générées par le bouton{" "}
          <b>
            <i>Suivant</i>
          </b>
        </div>
      </ButtonInfo>
      <ButtonInfo>
        <ButtonDisplay>
          <ArrowButton direction="UP" dispatch={() => {}} />
        </ButtonDisplay>
        <ButtonDisplay>
          <ArrowButton direction="DOWN" dispatch={() => {}} />
        </ButtonDisplay>
        <ButtonDisplay>
          <ArrowButton direction="LEFT" dispatch={() => {}} />
        </ButtonDisplay>
        <ButtonDisplay>
          <ArrowButton direction="RIGHT" dispatch={() => {}} />
        </ButtonDisplay>
        Permetent le déplacement de la grille
      </ButtonInfo>
      <ButtonInfo>
        <ControlDisplay>
          <ZoomLevel value={1} dispatch={() => {}} />
        </ControlDisplay>
        Controle le niveau de zoom de la grille
      </ButtonInfo>
      <ButtonInfo>
        <ControlDisplay>
          <Selector
            selected="NORMAL"
            flipRootId="info-page"
            dispatch={() => {}}
          >
            {[
              {
                value: "FAST",
                displayText: "rapide",
                action: { type: "SET_SPEED", payload: { speed: "FAST" } },
              },
              {
                value: "NORMAL",
                displayText: "normal",
                action: { type: "SET_SPEED", payload: { speed: "NORMAL" } },
              },
              {
                value: "SLOW",
                displayText: "lent",
                action: { type: "SET_SPEED", payload: { speed: "SLOW" } },
              },
            ]}
          </Selector>
        </ControlDisplay>
        Permet de choisir la vitesse de rendu des générations
      </ButtonInfo>
    </InfoWrapper>
  </StyledInfoPage>
);

export default InfoPage;
