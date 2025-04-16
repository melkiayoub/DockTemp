import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { readFileSync } from "fs";

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
      console.log(config);
    }
  )
  .demandCommand(1)
  .strict() 
  .parse();
