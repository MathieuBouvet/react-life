import React from "react";
import styled from "styled-components";

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
`;

const InfoPage = (props: InfoPageProps) => (
  <StyledInfoPage {...props}>
    <h2>C'est quoi React Life ?</h2>
    <p>React Life est une implementation du jeu de la vie.</p>
    <p>
      Le jeu de la vie est un automate cellulaire inventé par par John Horton
      Conway en 1970.{" "}
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
    </p>
    <h2>Comment utiliser React Life ?</h2>
    <h3>Les contrôles :</h3>
    <p>Cliquer pour activer ou désactiver une cellule</p>
    <p>
      Maintenir le clic et déplacer la souris pour activer des cellule
      rapidement
    </p>
    <p>Utiliser la molette de la souris pour zoomer ou dézoomer</p>
    <p>Utiliser les fèches directionelles du clavier pour déplacer la grille</p>
    <h3>La barre d'outils :</h3>
    <p></p>
  </StyledInfoPage>
);

export default InfoPage;
