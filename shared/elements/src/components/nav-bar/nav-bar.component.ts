import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from "@angular/core";
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";
import { SecondaryButtonComponent } from "../secondary-button/secondary-button.component";
import { NgIf } from "@angular/common";

@Component({
    standalone: true,
    imports: [PrimaryButtonComponent, SecondaryButtonComponent, NgIf],
    selector: "agv-nav-bar",
    templateUrl: "./nav-bar.component.html",
    styleUrls: ["./nav-bar.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {
    @Input() isLogged: boolean = false;
    @Output() logout: EventEmitter<void> = new EventEmitter<void>();
    @Output() login: EventEmitter<void> = new EventEmitter<void>();
    @Output() home: EventEmitter<void> = new EventEmitter<void>();

    readonly style: string = `
        padding: 0 8px;
        font-size: 12px;
        text-transform: none;
    `;

    homePressed(): void {
        this.home.emit();
    }

    logoutPressed(): void {
        this.logout.emit();
    }

    loginPressed(): void {
        this.login.emit();
    }
}
