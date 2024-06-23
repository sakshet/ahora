import { Link } from "@Core/link";
import { colors, createStyleSheet, useStyleSheet } from "@Core/styles";
import { Heading, Text } from "@Core/text";
import React from "react";

const homepageStyleSheet = createStyleSheet("homepageStyles", {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blueGray080,
    color: colors.white,
    gap: "5px",
  },
});
export const Homepage = () => {
  const classes = useStyleSheet(homepageStyleSheet, null);
  return (
    <div className={classes.container}>
      <Heading typography="heading01">We'll be back soon</Heading>
      <Text typography="body01">All good things take time</Text>
    </div>
  );
};
