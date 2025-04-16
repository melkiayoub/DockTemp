import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { readFileSync, writeFileSync } from "fs";
import nunjucks from "nunjucks";
const { configure, render } = nunjucks;

yargs(hideBin(process.argv))
  .command(
    "auto <path>",
    "Read and print file contents from given path",
    (yargs) => {
      return yargs.positional("path", {
        type: "string",
        describe: "Path to the config file",
      });
    },
    (args) => {
      const config = readFileSync(args.path, "utf-8");
      const configData = JSON.parse(config);
      configure("templates", { autoescape: true });
      const dockerfile = render("Dockerfile", {
        ServiceName: configData.ServiceName,
        ServiceType: configData.ServiceType,
        Dockerfile: configData.Dockerfile,
      });
      writeFileSync("DockerFile", dockerfile);
    }
  )
  .demandCommand(1)
  .strict() // Optional: disallow unknown commands
  .parse();
