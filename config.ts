import { StringCase, ColorFormat } from "@supernovaio/export-helpers"
import { TokenType } from "@supernovaio/sdk-exporters"

/**
 * Main configuration of the exporter - type interface. Default values for it can be set through `config.json` and users can override the behavior when creating the pipelines.
 */
export type ExporterConfiguration = {
  showGeneratedFileDisclaimer: boolean
  disclaimer: string
  generateEmptyFiles: boolean
  showDescriptions: boolean
  useReferences: boolean
  tokenNameStyle: StringCase
  colorFormat: ColorFormat
  colorPrecision: number
  indent: number
  baseStyleFilePath: string
}