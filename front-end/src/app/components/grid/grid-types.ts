export type GroupBy = {field: string; label: string; value?: any};

export class GridGroupSeparator {
	constructor(public group: GroupBy[]) {}
	public metadata: any = undefined;
	public get text(): string {
		return this.group.map((x) => x.value).join(" - ");
	}
}
