export default class SchemaReport {
  public totalAdditions: number = 0;
  public totalDeletions: number = 0;
  public additions: any[] = [];
  public deletions: any[] = [];
  private deletionNotice: string = "The PR is blocked because there is a potential breaking change";
  public getState(): "error" | "failure" | "pending" | "success" {
    return this.totalDeletions ? "error" : "success";
  }
  public getDescription(): string {
    return this.totalDeletions ? this.deletionNotice : "All good";
  }
  public getNotice(additionMessage: string, deletionMessage: string, warningMessage: string): string {
    return `
👋  There are changes to your schema
-------
${additionMessage}

${deletionMessage}

> ${warningMessage}
`;
  }
  public getBody(): string {
      const additionMessage = this.totalAdditions ? `✅ TotalAdditions: ${this.totalAdditions}` : "";
      const deletionMessage = this.totalDeletions ? `❌ TotalDeletions: ${this.totalDeletions}` : "";
      const warningMessage =  this.totalDeletions ? this.deletionNotice : "";
      return this.getNotice(additionMessage, deletionMessage, warningMessage);
  }
}
