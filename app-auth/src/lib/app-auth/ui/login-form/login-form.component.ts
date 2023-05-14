import { CommonModule } from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    inject,
} from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { LoginRequest } from "@web-app/shared/api";
import {
    MultitabComponent,
    PrimaryButtonComponent,
    TextboxComponent,
} from "@web-app/shared/elements";
import { Subscription } from "rxjs";

@Component({
    standalone: true,
    imports: [
        CommonModule,
        MultitabComponent,
        TextboxComponent,
        PrimaryButtonComponent,
        ReactiveFormsModule,
    ],
    selector: "auth-login-form",
    templateUrl: "./login-form.component.html",
    styleUrls: ["./login-form.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit, OnDestroy {
    private readonly fb: FormBuilder = inject(FormBuilder);
    private readonly subscriptions: Subscription[] = [];

    @Input() loginEmailFieldName?: string;
    @Input() loginEmailFieldPlaceholder?: string;
    @Input() loginPasswordFieldName?: string;
    @Input() loginPasswordFieldPlaceholder?: string;
    @Input() validationPattern: string = "";

    @Input() initialValues?: LoginRequest;

    @Output() formSubmit = new EventEmitter<LoginRequest>();

    @Output() formChange = new EventEmitter<LoginRequest>();

    readonly form = this.fb.group({
        main: this.fb.control<string | null>("", [
            Validators.required,
            Validators.email,
        ]),
        secondary: this.fb.control<string | null>("", [Validators.required]),
    });

    ngOnInit() {
        if (this.initialValues?.email || this.initialValues?.password) {
            if (this.initialValues.email) {
                this.form.controls.main.setValue(this.initialValues.email);
                this.form.controls.main.markAsTouched();
            }
            if (this.initialValues.password) {
                this.form.controls.secondary.setValue(
                    this.initialValues.password,
                );
                this.form.controls.secondary.markAsTouched();
            }
        }

        this.form.controls.secondary.addValidators([
            Validators.pattern(this.validationPattern),
        ]);

        this.subscriptions.push(
            this.form.valueChanges.subscribe(() => this.onFormChange()),
        );
    }

    ngOnDestroy() {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }

    onFormChange() {
        this.formChange.emit({
            email: this.form.controls.main.value ?? "",
            password: this.form.controls.secondary.value ?? "",
        });
    }

    submitForm() {
        if (
            this.form.valid &&
            this.form.controls.main.value &&
            this.form.controls.secondary.value
        ) {
            this.formSubmit.emit({
                email: this.form.controls.main.value,
                password: this.form.controls.secondary.value,
            });
        }
    }
}
