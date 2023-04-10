import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
    MultitabComponent,
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    TextboxComponent,
} from "@web-app/shared/elements";
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms";

@Component({
    standalone: true,
    imports: [
        CommonModule,
        PrimaryButtonComponent,
        SecondaryButtonComponent,
        TextboxComponent,
        ReactiveFormsModule,
        MultitabComponent,
    ],
    templateUrl: "./app-dashboard.component.html",
    styleUrls: ["./app-dashboard.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDashboardComponent {
    isDisabled = false;
    testForm = new FormGroup({
        name: new FormControl("asdaaa", [
            Validators.required,
            Validators.maxLength(5),
        ]),
        name2: new FormControl("asdaaa", Validators.maxLength(5)),
    });

    selectedTab = 1;

    toggleDisable() {
        this.isDisabled = !this.isDisabled;
        if (this.isDisabled) {
            this.testForm.controls.name.disable();
        } else {
            this.testForm.controls.name.enable();
        }
    }
}
