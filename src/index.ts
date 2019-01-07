import fetch from "node-fetch";
import { Application, Context } from "probot";
import getReport from "./schema-reporter";

export = (app: Application) => {
  app.on(["pull_request.opened", "pull_request.edited"], async (context: Context) => {
    const patch = await fetch(context.payload.pull_request.patch_url);
    const patchContent = await patch.text();
    const report = getReport(patchContent);
    const repo = context.repo();
    const { sha } = context.payload.pull_request.head;

    const prComment = context.issue({ body: report.getBody()});
    await context.github.issues.createComment(prComment);

    await context.github.repos.createStatus({
      context: "gql-validator",
      description: report.getDescription(),
      ...repo,
      sha,
      state: report.getState(),
    });
  });
};
