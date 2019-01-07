import CreateDiffReport from "../src/schema-reporter";

const multiline = `
diff --git a/graphql.schema b/graphql.schema
index f128a62..c53245e 100644
--- a/graphql.schema
+++ b/graphql.schema
@@ -49,7 +49,7 @@ scalar Seconds
 type Team implements INode {
   id: ID!
   members: [Member]
-  name: String
+  names: [String]
 }

 type TeamsMutation {`;
describe("diff", () => {
  test("reports correct number of adds and deletes", () => {
    const report = CreateDiffReport(multiline);
    expect(report.totalAdditions).toBe(1);
    expect(report.totalDeletions).toBe(1);
  });
});
