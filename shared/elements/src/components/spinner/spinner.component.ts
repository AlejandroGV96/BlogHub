import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    standalone: true,
    selector: "agv-spinner",
    templateUrl: "./spinner.component.html",
    styleUrls: ["./spinner.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {}
