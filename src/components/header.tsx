import { navigate } from "gatsby";
import React from "react";

import { Button } from "./commonStyles";
import styled from "@emotion/styled";

interface HeaderProps {
  siteTitle?: string;
  currentPage?: string;
  currentSubPage?: string;
}

const TopMenuButton = styled(Button)`
  background-color: #38f;
  color: white;
`;

const Banner = styled.div`
  height: 75px;
  text-align: center;
  text-transform: uppercase;
  line-height: 1.1;
  font-size: 60px;
  font-weight: 350;
  color: #38f;
`;

export default function Header({
  currentPage = "",
}: HeaderProps) {

  const title = "Music Theory - " + currentPage;
  return (
    <div className="d-flex flex-column">
      <Banner>
        {"Music Theory Helper"}
      </Banner>
      <div className="d-flex flex-wrap flex-row justify-content-center">
        <TopMenuButton
          aria-selected={currentPage == "Scales"}
          onClick={() => navigate("/")}
          aria-label={"Navigate to Scales"}
        >
          Scales
        </TopMenuButton>

        <TopMenuButton
          aria-selected={currentPage == "Chords"}
          onClick={() => navigate("/chords/")}
          aria-label={"Navigate to Chords"}
        >
          Chords
        </TopMenuButton>
      </div>
    </div>
  );
}

