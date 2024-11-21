
import { FileHelper, NamingHelper } from "@supernovaio/export-helpers"
import { OutputTextFile, Token, TokenGroup, TokenTheme } from "@supernovaio/sdk-exporters"
import { exportConfiguration } from ".."
import { convertedToken } from "../content/token"

function generateBaseCSS(tokens: Array<Token>, tokenGroups: Array<TokenGroup>): OutputTextFile {
  const baseTokens = tokens.filter((token) => token.themeId === null);
  const baseCssVariables = baseTokens.map((token) => 
    convertedToken(token, new Map(tokens.map((t) => [t.id, t])), tokenGroups)
  );

  const disclaimer = exportConfiguration.showGeneratedFileDisclaimer ? `/* ${exportConfiguration.disclaimer} */\n` : "";
  const baseContent = `${disclaimer}/* Base Theme (base.css) */\n:root {\n${baseCssVariables.join("\n")}\n}`;

  return FileHelper.createTextFile({
    relativePath: `${exportConfiguration.baseStyleFilePath}`,
    fileName: "formation.css",
    content: baseContent,
  });
}

function generateThemeCSS( tokens: Array<Token>,  tokenGroups: Array<TokenGroup>,  themes: Array<TokenTheme>): OutputTextFile[] {
  return themes.map((theme) => {
    const themeCssVariables = theme.overriddenTokens.map((overriddenToken) => {
      const token = tokens.find((t) => t.id === overriddenToken.id);
      return convertedToken(overriddenToken, new Map(tokens.map((t) => [t.id, t])), tokenGroups);
    });

    const disclaimer = exportConfiguration.showGeneratedFileDisclaimer ? `/* ${exportConfiguration.disclaimer} */\n` : "";
    const themeContent = `${disclaimer}/* Theme: ${theme.name} */\n:root {\n${themeCssVariables.join("\n")}\n}`;

    return FileHelper.createTextFile({
      relativePath: `${exportConfiguration.baseStyleFilePath}/themes/`,
      fileName: `${NamingHelper.codeSafeVariableName(theme.name, exportConfiguration.tokenNameStyle)}.css`,
      content: themeContent,
    });
  });
}

export function buildOutputCSS(tokens: Array<Token>,  tokenGroups: Array<TokenGroup>, themes: Array<TokenTheme>): OutputTextFile[] {
  const baseFile = generateBaseCSS(tokens, tokenGroups);
  const themeFiles = generateThemeCSS(tokens, tokenGroups, themes);

  return [baseFile, ...themeFiles];
}
