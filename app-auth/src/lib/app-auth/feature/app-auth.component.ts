import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MultitabComponent } from "@web-app/shared/elements";
import { LoginFormComponent, RegisterFormComponent } from "../ui";
import { ApiModule, LoginRequest, RegisterRequest } from "@web-app/shared/api";
import { LoginStore } from "../data-access/login.store";
import { SpinnerComponent } from "@web-app/shared/elements";
@Component({
    standalone: true,
    selector: "auth-screen",
    imports: [
        CommonModule,
        ApiModule,
        SpinnerComponent,
        MultitabComponent,
        LoginFormComponent,
        RegisterFormComponent,
    ],
    templateUrl: "./app-auth.component.html",
    styleUrls: ["./app-auth.component.scss"],
    providers: [LoginStore],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppAuthComponent {
    private readonly loginStore: LoginStore = inject(LoginStore);

    loginParams$ = this.loginStore.selectLoginParams;
    registerParams$ = this.loginStore.selectRegisterParams;

    //region Login Properties
    readonly loginEmailFieldName: string = "Email";
    readonly loginEmailFieldPlaceholder: string = "Enter your email";
    readonly loginPasswordFieldName: string = "Password";
    readonly loginPasswordFieldPlaceholder: string = "Enter your password";
    //endregion

    //region Register Properties
    readonly registerUsernameFieldName: string = "Username";
    readonly registerUsernameFieldPlaceholder: string = "Enter your username";
    readonly registerEmailFieldName: string = "Email";
    readonly registerEmailFieldPlaceholder: string = "Enter your email";
    readonly registerPasswordFieldName: string = "Password";
    readonly registerPasswordFieldPlaceholder: string = "Enter your password";
    //endregion

    selectedTab: number = 0;
    readonly validationPattern: string =
        "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$.@$!%*?&])[A-Za-zd$@$!.%*?&].{7,}";

    readonly tabs: string[] = ["Login", "Register"];

    onLoginSubmit(loginParams: LoginRequest) {
        this.loginStore.login(loginParams);
    }

    onLoginChange(loginParams: LoginRequest) {
        this.loginStore.updateLoginParameters(loginParams);
    }

    onRegisterSubmit(registerParams: RegisterRequest) {
        this.loginStore.register(registerParams);
    }

    onRegisterChange(registerParams: RegisterRequest) {
        this.loginStore.updateRegisterParameters(registerParams);
    }
}
