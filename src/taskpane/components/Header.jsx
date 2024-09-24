import * as React from "react";
import { Image, tokens, makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  welcome__header: {
    width: "100%",
    display: "flex",
    marginBottom: "1rem",
    gap: "1rem",
    
  },
  verticalAlign: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  horizontalAlign: {
    justifyContent: "center",
  },
  message: {
    fontSize: tokens.fontSizeBase700,
    letterSpacing: "2px",
    fontWeight: tokens.fontWeightRegular,
    fontColor: tokens.colorNeutralBackgroundStatic,
  },
});

const Header = (props) => {
  const { title, logo, message } = props;
  const styles = useStyles();

  return (
    <section className={`${styles.welcome__header} ${props.user ? styles.verticalAlign : styles.horizontalAlign}`}>
      <Image width="64" height="64" src={logo} alt={title} />

      {props.user && <h5 className={styles.message}>{props.user.email}</h5>}
    </section>
  );
};

export default Header;
