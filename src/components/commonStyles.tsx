import styled from "@emotion/styled";

export const Button = styled.button`
  display: block;
  margin: 10px 10px 0px 0px;
  width: 130px;
  height: 48px;
  padding: 10px 20px 20px 20px;
  background: #ccdeff;
  border-radius: 26px;
  border-width: 0;
  text-align: right;
  line-height: normal;
  text-decoration: none important!;
  font-size: 21px;
  font-weight: 700;
  text-transform: uppercase;
  color: #121212;
`;

export const Control = styled.button`
  display: block;
  background-color: #38f;
  margin: 10px 10px 0px 0px;
  padding: 10px 20px 20px 20px;
  border-radius: 26px;
  border-width: 0;
  text-align: right;
  line-height: normal;
  text-transform: uppercase;
`;

export const RelativeControl = styled(Control)`
  margin: 0px 10px 0px 0px;
  padding: 10px 20px 10px 20px;
`;

export const NoteInput = styled.input`
  border: 1px 1px 1px 1px;
  border-radius: 25px;
  border-color: #668;
  border-style: solid;
  padding-left: 30px;
  width: 120px;
  box-sizing: border-box;
  height: 60px;
`;

export const BigInput = styled(NoteInput)`
  width: auto important!;
`;

export const Warning = styled.div`
border-color: #668;
color: red;
padding-left: 30px;
`;

export const InputWrapper = styled.div`
  height: 80px;
`;

export const Card = styled.div`
  border: 1px 1px 1px 1px;
  border-radius: 25px;
  background: #FAF9F6;
  border-color: #38f;
  border-style: double;

  padding: 10px 20px 10px 20px;
`;

export const Tag = styled.button`
  border-radius: 10px;
  background-color: #ca8;
  border-width: 0;
`;

export const Listing = styled.button`
  border-width: 0px 0px 1px 10px;
  margin: 10px 0px 0px 0px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: inherit;
  border-color: #ccdeff;
  text-decoration: none;
`;

export const WholePage = styled.div`
  padding: 10px 5% 5% 10px;
  align-content: center;
`;


export const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
export const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}
export const headingAccentStyles = {
  color: "#663399",
}
export const paragraphStyles = {
  marginBottom: 48,
}
export const codeStyles = {
  color: "#8A6534",
  padding: 4,
  backgroundColor: "#FFF4DB",
  fontSize: "1.25rem",
  borderRadius: 4,
}
export const listStyles = {
  marginBottom: 96,
  paddingLeft: 0,
}
export const doclistStyles = {
  paddingLeft: 0,
}
export const listItemStyles = {
  fontWeight: 300,
  fontSize: 24,
  maxWidth: 560,
  marginBottom: 30,
}

export const linkStyle = {
  color: "#8954A8",
  fontWeight: "bold",
  fontSize: 16,
  verticalAlign: "5%",
}

export const docLinkStyle = {
  ...linkStyle,
  listStyleType: "none",
  display: `inline-block`,
  marginBottom: 24,
  marginRight: 12,
}

export const descriptionStyle = {
  color: "#232129",
  fontSize: 14,
  marginTop: 10,
  marginBottom: 0,
  lineHeight: 1.25,
}

export  const docLinks = [
  {
    text: "TypeScript Documentation",
    url: "https://www.gatsbyjs.com/docs/how-to/custom-configuration/typescript/",
    color: "#8954A8",
  },
  {
    text: "GraphQL Typegen Documentation",
    url: "https://www.gatsbyjs.com/docs/how-to/local-development/graphql-typegen/",
    color: "#8954A8",
  }
]

export const badgeStyle = {
  color: "#fff",
  backgroundColor: "#088413",
  border: "1px solid #088413",
  fontSize: 11,
  fontWeight: "bold",
  letterSpacing: 1,
  borderRadius: 4,
  padding: "4px 6px",
  display: "inline-block",
  position: "relative" as "relative",
  top: -2,
  marginLeft: 10,
  lineHeight: 1,
}
