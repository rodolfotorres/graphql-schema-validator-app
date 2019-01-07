import parser from "parse-diff";
import SchemaReport from "./schema-report";

export = (file: string): SchemaReport => {
  const files = parser(file);
  const report: SchemaReport = new SchemaReport();
  const schema = files.find((f) => f.from === "graphql.schema");
  if (schema) {
    report.totalAdditions = schema.additions;
    report.totalDeletions = schema.deletions;
    schema.chunks.forEach((chunk) => {
        chunk.changes.forEach((c) => {
            if (c.type === "add") {
                report.additions.push(c);
            }
            if (c.type === "del") {
                report.deletions.push(c);
            }
        });
    });
  }
  return report;
};
