import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: "agv-secondary-button",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./secondary-button.component.html",
    styleUrls: ["./secondary-button.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecondaryButtonComponent {
    @Input() name: string = "Default";
    @Input() disabled: boolean = false;
    @Input() customStyle: string = "";

    @Output() press: EventEmitter<void> = new EventEmitter<void>();

    buttonPressed(): void {
        this.press.emit();
    }
}
