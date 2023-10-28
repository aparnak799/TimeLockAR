import reflex as rx


class FormState(rx.State):
    
    form_data: dict = {}

    def handle_submit(self, form_data: dict):
        """Handle the form submit."""
        self.form_data = form_data


def index():
    return rx.vstack(
        rx.form(
            rx.heading(
                "TimeLockVR",
                margin_top="3em",
                size="xl",
                color="black",
                text_align="center"
            ),
            rx.text(
                "Login", font_size="1.5em",
                margin_top="2em"
            ),
            rx.vstack(
                rx.input(
                    margin_top="2em",
                    placeholder="Email",
                    id="email",
                    type_="password"
                ),
                rx.input(
                    placeholder="Password", 
                    id="password", 
                    type_="password"
                ),
                
                rx.link(
                    rx.button("Login"),
                    is_loading=False,
                    loading_text="Loading...",
                    button = True,
                    href="/",
                    spinner_placement="start",
                    margin_top="4em",
                    type_="submit"
                ),
                rx.link(
                    "Don't have an account? Sign up here!", 
                    href="/", 
                    margin_top="4em",
                    color="rgb(107,99,246)"
                )
            ),
            on_submit=FormState.handle_submit,
        ),
        # rx.text(FormState.form_data.to_string()),
    )


# Add state and page to the app.
app = rx.App()
app.add_page(index)
app.compile()