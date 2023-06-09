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
import { UserProfile } from "@web-app/shared/api";

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
    @Input() currentUser?: UserProfile;
    @Output() logout: EventEmitter<void> = new EventEmitter<void>();
    @Output() login: EventEmitter<void> = new EventEmitter<void>();
    @Output() home: EventEmitter<void> = new EventEmitter<void>();
    @Output() create: EventEmitter<void> = new EventEmitter<void>();
    @Output() profile: EventEmitter<void> = new EventEmitter<void>();

    readonly style: string = `
        padding: 0 8px;
        font-size: 12px;
        text-transform: none;
    `;

    homePressed(): void {
        this.home.emit();
    }

    createPressed(): void {
        this.create.emit();
    }

    profilePressed(): void {
        this.profile.emit();
    }

    logoutPressed(): void {
        this.logout.emit();
    }

    loginPressed(): void {
        this.login.emit();
    }
}
