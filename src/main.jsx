import React from "react"
import ReactDOM from "react-dom/client"

import "./index.css"
import { TransactionProvider } from "./context/TransactionContext"
import App from "./App"

ReactDOM.createRoot(document.getElementById("root")).render(
	<TransactionProvider>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</TransactionProvider>
)
