import { Link } from "@Core/link";
import { colors, createStyleSheet, useStyleSheet } from "@Core/styles";
import { Heading, Text } from "@Core/text";
import React from "react";

const headerStyleSheet = createStyleSheet("headerStyles", {
  container: {
    display: "flex",
    flexDirection: "row",
    padding: "5px 25px",
    height: "40px",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.blueGray080,
    color: colors.gray030,
    borderBottom: `3px solid ${colors.gray030}`,
  },
  navigation: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "40px",
  },
});
export const Header = () => {
  const classes = useStyleSheet(headerStyleSheet, null);
  return (
    <div className={classes.container}>
      <Heading typography="heading04">
        <Link to="">AHORA</Link>
      </Heading>
      <div className={classes.navigation}>
        <Text typography="body02">
          <Link to="/about">About Us</Link>
        </Text>
        <Text typography="body02">
          <Link to="/login">Log In / Sign Up</Link>
        </Text>
      </div>
    </div>
  );
};
