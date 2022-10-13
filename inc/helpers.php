<?php
/**
 * Helper PHP Functions.
 *
 * @package grigora-kit
 */

if ( ! function_exists( 'grigora_kit_get_svg' ) ) {
	/**
	 * Grigora SVG Logo in base64.
	 */
	function grigora_kit_get_svg() {
		return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkuNTI2NCA0LjM1MjI4QzkuMzEzNzggNC41MzE2NCA5LjA1MDM4IDQuNjQwMDYgOC43NzMwNSA0LjY2MjM3QzguNDk1NzMgNC42ODQ2OCA4LjIxODM3IDQuNjE5NzcgNy45Nzk3OCA0LjQ3NjcxQzcuNzQxMiA0LjMzMzY2IDcuNTUzMzQgNC4xMTk2MyA3LjQ0MjQ5IDMuODY0NTdDNy4zMzE2NCAzLjYwOTUxIDcuMzAzMzUgMy4zMjYyIDcuMzYxNTggMy4wNTQyN0M3LjQxOTgxIDIuNzgyMzUgNy41NjE2NCAyLjUzNTQzIDcuNzY3MjMgMi4zNDgwN0M3Ljk3MjgyIDIuMTYwNzEgOC4yMzE4OCAyLjA0MjI4IDguNTA4MTQgMi4wMDkzN0M4Ljc4NDQxIDEuOTc2NDYgOS4wNjQwNSAyLjAzMDcxIDkuMzA3OTUgMi4xNjQ1MkM5LjU1MTg0IDIuMjk4MzQgOS43NDc3NiAyLjUwNTAyIDkuODY4MzEgMi43NTU2NUM5Ljk5NTQ1IDMuMDIyMjEgMTAuMDMwOSAzLjMyMzMxIDkuOTY5MDMgMy42MTIwOEM5LjkwNzE5IDMuOTAwODUgOS43NTE1NyA0LjE2MTA5IDkuNTI2NCA0LjM1MjI4VjQuMzUyMjhaIiBmaWxsPSJibGFjayIvPgo8cGF0aCBkPSJNMy43NzE4IDIuNzE2OTlDMy44NTAwMyAyLjY4MzczIDMuOTMzOTEgMi42NjY1NyA0LjAxODYzIDIuNjY2NUM0LjEwMzM2IDIuNjY2NDMgNC4xODcyNyAyLjY4MzQ1IDQuMjY1NTUgMi43MTY1OEM0LjM0MzgzIDIuNzQ5NzEgNC40MTQ5NSAyLjc5ODMgNC40NzQ4MyAyLjg1OTU3QzQuNTM0NzIgMi45MjA4NCA0LjU4MjE5IDIuOTkzNTkgNC42MTQ1MiAzLjA3MzY0QzQuNjQ3NzEgMy4xNTMxMyA0LjY2NDk5IDMuMjM4NiA0LjY2NTM2IDMuMzI1MDJDNC42NjU3MiAzLjQxMTQzIDQuNjQ5MTYgMy40OTcwNiA0LjYxNjY0IDMuNTc2ODNDNC41ODQxMyAzLjY1NjYgNC41MzYzMiAzLjcyODkxIDQuNDc2MDMgMy43ODk1QzQuNDE1NzQgMy44NTAwOSA0LjM0NDIgMy44OTc3MiA0LjI2NTYyIDMuOTI5NkM0LjE4NjU5IDMuOTcwMjQgNC4xMDAyMSAzLjk5MzgxIDQuMDExODggMy45OTg4MkMzLjkyMzU0IDQuMDAzODQgMy44MzUxNCAzLjk5MDIgMy43NTIxOSAzLjk1ODc2QzMuNjY5MjQgMy45MjczMSAzLjU5MzUyIDMuODc4NzQgMy41Mjk3NCAzLjgxNjA2QzMuNDY1OTYgMy43NTMzOCAzLjQxNTUgMy42Nzc5NCAzLjM4MTUgMy41OTQ0NUMzLjM0NzUgMy41MTA5NiAzLjMzMDY5IDMuNDIxMjEgMy4zMzIxMiAzLjMzMDc4QzMuMzMzNTQgMy4yNDAzNiAzLjM1MzE4IDMuMTUxMiAzLjM4OTggMy4wNjg4OEMzLjQyNjQyIDIuOTg2NTUgMy40NzkyMyAyLjkxMjgyIDMuNTQ0OTUgMi44NTIyOEMzLjYxMDY4IDIuNzkxNzQgMy42ODc5IDIuNzQ1NjggMy43NzE4IDIuNzE2OTlWMi43MTY5OVoiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik0xNS4wMzg0IDkuNjI4MjFDMTUuMTMxMyA5LjcxOTc2IDE1LjIwNTIgOS44MjkzMSAxNS4yNTU2IDkuOTUwMzZDMTUuMzA2IDEwLjA3MTQgMTUuMzMyIDEwLjIwMTUgMTUuMzMyIDEwLjMzMjlDMTUuMzMyIDEwLjQ2NDQgMTUuMzA2IDEwLjU5NDUgMTUuMjU1NiAxMC43MTU1QzE1LjIwNTIgMTAuODM2NiAxNS4xMzEzIDEwLjk0NjEgMTUuMDM4NCAxMS4wMzc3QzE0Ljk0OTUgMTEuMTMyNyAxNC44NDIxIDExLjIwNzkgMTQuNzIzIDExLjI1ODZDMTQuNjAzOSAxMS4zMDk0IDE0LjQ3NTggMTEuMzM0NCAxNC4zNDY3IDExLjMzMjNDMTQuMTQ3NSAxMS4zNDIyIDEzLjk1MDEgMTEuMjg5MyAxMy43ODE2IDExLjE4MDlDMTMuNjEzMiAxMS4wNzI1IDEzLjQ4MTggMTAuOTEzOSAxMy40MDU1IDEwLjcyNjhDMTMuMzI5MyAxMC41Mzk3IDEzLjMxMTggMTAuMzMzMyAxMy4zNTU2IDEwLjEzNThDMTMuMzk5NCA5LjkzODIxIDEzLjUwMjIgOS43NTkyMyAxMy42NTAxIDkuNjIzM0MxMy43NDEyIDkuNTMwMiAxMy44NDk4IDkuNDU2NTkgMTMuOTY5NSA5LjQwNjgzQzE0LjA4OTEgOS4zNTcwNiAxNC4yMTc0IDkuMzMyMTQgMTQuMzQ2NyA5LjMzMzU1QzE0LjQ3NTUgOS4zMzM0NCAxNC42MDMgOS4zNTk0NSAxNC43MjE4IDkuNDEwMDVDMTQuODQwNiA5LjQ2MDY1IDE0Ljk0ODMgOS41MzQ4MiAxNS4wMzg0IDkuNjI4MjFaIiBmaWxsPSJibGFjayIvPgo8cGF0aCBkPSJNMTkuNjc2MSA5LjA5MzA2QzE5LjIwMDggNy42NzU5NyAxOC4yNDM4IDYuNDgxMTIgMTYuOTc5NyA1LjcyNjU2QzE1LjkxNDkgNS4xMDIwMiAxNC42OTM1IDQuODEzODMgMTMuNDY5MiA0Ljg5ODIxQzEzLjQwMDUgNC42ODU0IDEzLjI5MTIgNC40ODg2NyAxMy4xNDc3IDQuMzE5NDNDMTIuOTc0MiA0LjEzNzggMTIuNzQyOSA0LjAyNTg3IDEyLjQ5NTcgNC4wMDM5NkMxMi4yNDg1IDMuOTgyMDUgMTIuMDAxOSA0LjA1MTYgMTEuODAwNSA0LjJDMTEuNTk5MSA0LjM0ODM5IDExLjQ1NjQgNC41NjU4IDExLjM5ODEgNC44MTI3N0MxMS4zMzk5IDUuMDU5NzMgMTEuMzcwMSA1LjMxOTg5IDExLjQ4MzIgNS41NDYwMkMxMS41NDczIDUuNjU5ODIgMTEuNTY3OSA1Ljc5MzkyIDExLjU0MTEgNS45MjI0QzExLjUxNDMgNi4wNTA4OCAxMS40NDE5IDYuMTY0NjEgMTEuMzM4IDYuMjQxNjJDMTEuMjYzMyA2LjI5NTcgMTEuMTc2MSA2LjMyODYgMTEuMDg1IDYuMzM2OTlDMTAuOTkzOSA2LjM0NTM4IDEwLjkwMjMgNi4zMjg5NyAxMC44MTk0IDYuMjg5NDFDMTAuNjIyNCA2LjE5MzgzIDEwLjU1NSA1Ljk3MDgyIDEwLjQyMDIgNS44MDYyMUMxMC4yNjQzIDUuNjI2ODEgMTAuMDY4MSA1LjQ4OTAzIDkuODQ4NTcgNS40MDQ4M0M5LjYyOSA1LjMyMDYzIDkuMzkyNjggNS4yOTI1NCA5LjE2MDExIDUuMzIzMDFDOC45MDc1OSA1LjM1MzM4IDguNjY3MTYgNS40NTA2NSA4LjQ2MjU2IDUuNjA1MjNDOC4yNTc5NiA1Ljc1OTgxIDguMDk2MjUgNS45NjYzNCA3Ljk5MzQgNi4yMDQ0NUM3Ljg2NjkgNi41MDE3IDcuODM5NDkgNi44MzMzMyA3LjkxNTQgNy4xNDgxMkM3Ljk5MTMxIDcuNDYyOSA4LjE2NjMzIDcuNzQzMzQgOC40MTM0MiA3Ljk0NjExQzguNTkzMDMgOC4wNjk0NCA4Ljc4MjA0IDguMTc3NzYgOC45Nzg2MiA4LjI3MDAyQzkuMDYxOTMgOC4zNDk3NyA5LjExNzI0IDguNDU1NDIgOS4xMzU5OSA4LjU3MDYxQzkuMTU0NzMgOC42ODU4IDkuMTM1ODggOC44MDQxIDkuMDgyMzMgOC45MDcyMUM5LjA1MDQzIDguOTczNDUgOS4wMDUzOSA5LjAzMjE1IDguOTUwMDggOS4wNzk1NkM4Ljg5NDc2IDkuMTI2OTcgOC44MzA0IDkuMTYyMDQgOC43NjExMSA5LjE4MjUyQzguNjkxODEgOS4yMDMwMSA4LjYxOTEgOS4yMDg0NyA4LjU0NzYyIDkuMTk4NTVDOC40NzYxNSA5LjE4ODYzIDguNDA3NDggOS4xNjM1NSA4LjM0NjAxIDkuMTI0OTJDOC4yMTkyOSA5LjAzODU0IDguMDc1OTQgOC45ODEwNCA3LjkyNTY1IDguOTU2MzFDNy43NzUzNSA4LjkzMTU3IDcuNjIxNjMgOC45NDAxOCA3LjQ3NDg2IDguOTgxNTVDNy4yMjM3OCA5LjA1MjUgNy4wMDU0NiA5LjIxMjQzIDYuODU4OCA5LjQzMjg1QzYuNzEyMTQgOS42NTMyNyA2LjY0NjY3IDkuOTE5ODYgNi42NzQwNyAxMC4xODUxQzYuNzAxNDcgMTAuNDUwMyA2LjgxOTk0IDEwLjY5NyA3LjAwODM5IDEwLjg4MTFDNy4xOTY4MyAxMS4wNjUzIDcuNDQzIDExLjE3NDkgNy43MDMwMiAxMS4xOTA1QzcuOTE2ODcgMTEuMTgwNyA4LjEyOTAxIDExLjE0NjkgOC4zMzU2NCAxMS4wODk2QzguNDU4MzkgMTEuMDgxMSA4LjU4MDUxIDExLjExMzggOC42ODM0NiAxMS4xODI4QzguNzg2NCAxMS4yNTE4IDguODY0NTUgMTEuMzUzMyA4LjkwNjAzIDExLjQ3MTlDOC45NDgyOSAxMS41OTIxIDguOTU0NTggMTEuNzIyNSA4LjkyNDEgMTEuODQ2NEM4Ljg5MzYxIDExLjk3MDMgOC44Mjc3NSAxMi4wODIxIDguNzM0OTEgMTIuMTY3NUM4LjY1MTY5IDEyLjI0MyA4LjU1MzI2IDEyLjI5ODggOC40NDY2MSAxMi4zMzA5QzguMzM5OTcgMTIuMzYzIDguMjI3NzIgMTIuMzcwNyA4LjExNzg1IDEyLjM1MzRDNy43NjA3NSAxMi4zNTEzIDcuNDE1NjEgMTIuNDg1IDcuMTQ5MjkgMTIuNzI4NkM2Ljg4Mjk4IDEyLjk3MjMgNi43MTQ0NiAxMy4zMDg0IDYuNjc2MzcgMTMuNjcyQzYuNjM4MjggMTQuMDM1NiA2LjczMzM0IDE0LjQwMDggNi45NDMxMyAxNC42OTY3QzcuMTUyOTIgMTQuOTkyNiA3LjQ2MjUxIDE1LjE5ODMgNy44MTE5MSAxNS4yNzM4QzguMDA0MTcgMTUuMzE3NCA4LjIwMzIzIDE1LjMxOTEgOC4zOTYxOCAxNS4yNzg5QzguNTg5MTMgMTUuMjM4NiA4Ljc3MTY3IDE1LjE1NzMgOC45MzE5NiAxNS4wNDAyQzguOTgzODEgMTUuMDAzIDkuMDcxOTYgMTQuOTA3NCA5LjEzNDE5IDE0Ljk5MjRDOS45ODI0MiAxNi4wODY4IDExLjE2OTQgMTYuODUyOCAxMi40OTk1IDE3LjE2NDJDMTMuNTYzMSAxNy40MjE0IDE0LjY3NDQgMTcuMzg0NyAxNS43MTk2IDE3LjA1OEMxNi43NjIzIDE2LjcyOTEgMTcuNjk3OSAxNi4xMTYgMTguNDI2NCAxNS4yODQ0QzE5LjE1NTMgMTQuNDYwNiAxOS42NTU2IDEzLjQ1MTkgMTkuODc1NCAxMi4zNjMyQzIwLjA5NTEgMTEuMjc0NSAyMC4wMjYzIDEwLjE0NTMgMTkuNjc2MSA5LjA5MzA2VjkuMDkzMDZaTTE2LjI5IDEzLjQ0NzJDMTYuMzAyIDEzLjgwNzMgMTYuMjIxMSAxNC4xNjQzIDE2LjA1NTQgMTQuNDgyMkMxNS44ODk3IDE0LjgwMDEgMTUuNjQ1MSAxNS4wNjc3IDE1LjM0NjMgMTUuMjU3OUMxNC45OTc3IDE1LjUwMDEgMTQuNTg1MyAxNS42Mjc5IDE0LjE2NCAxNS42MjQzQzEzLjgxMjEgMTUuNjM0NCAxMy40NjM3IDE1LjU1IDEzLjE1MzUgMTUuMzc5NkMxMi44NDMzIDE1LjIwOTEgMTIuNTgyMSAxNC45NTg0IDEyLjM5NTggMTQuNjUyNkMxMi4xNTg0IDE0LjI5NzcgMTIuMDMxOCAxMy44Nzc0IDEyLjAzMjggMTMuNDQ3MkMxMi4wMzI4IDEzLjE2NjkgMTIuMDg1NiAxMi44ODkyIDEyLjE4ODQgMTIuNjI5NUwxMy4xODQgMTMuMDM4M0MxMy4xMzE5IDEzLjE2OCAxMy4xMDU1IDEzLjMwNyAxMy4xMDYyIDEzLjQ0NzJDMTMuMTA2MiAxMy41ODY3IDEzLjEzMyAxMy43MjQ4IDEzLjE4NTEgMTMuODUzNkMxMy4yMzczIDEzLjk4MjQgMTMuMzEzNiAxNC4wOTk1IDEzLjQwOTkgMTQuMTk4MUMxMy41MDYyIDE0LjI5NjggMTMuNjIwNiAxNC4zNzUgMTMuNzQ2NCAxNC40MjgzQzEzLjg3MjIgMTQuNDgxNyAxNC4wMDcxIDE0LjUwOTIgMTQuMTQzMyAxNC41MDkyQzE0LjQxODMgMTQuNTA5MiAxNC42ODIxIDE0LjM5NzMgMTQuODc2NiAxNC4xOTgxQzE1LjA3MTEgMTMuOTk5IDE1LjE4MDQgMTMuNzI4OSAxNS4xODA0IDEzLjQ0NzJDMTUuMTkwMyAxMy4yMjk3IDE1LjEzMTcgMTMuMDE0NyAxNS4wMTMxIDEyLjgzMzlDMTQuODk0NSAxMi42NTMyIDE0LjcyMjIgMTIuNTE2MyAxNC41MjE4IDEyLjQ0MzZDMTQuMzkyNyAxMi40NzUyIDE0LjI2MDQgMTIuNDkxMiAxNC4xMjc3IDEyLjQ5MTRDMTMuODQ2MSAxMi40OTg3IDEzLjU2NiAxMi40NDczIDEzLjMwNDUgMTIuMzQwMUMxMy4wNDMgMTIuMjMyOSAxMi44MDU2IDEyLjA3MjQgMTIuNjA2NiAxMS44NjgyQzEyLjQwNzcgMTEuNjY0IDEyLjI1MTUgMTEuNDIwNCAxMi4xNDc1IDExLjE1MjRDMTIuMDQzNSAxMC44ODQzIDExLjk5MzkgMTAuNTk3NCAxMi4wMDE3IDEwLjMwOUMxMS45OTk2IDEwLjAyMDUgMTIuMDU0IDkuNzM0NSAxMi4xNjE4IDkuNDY3OTJDMTIuMjY5NSA5LjIwMTM0IDEyLjQyODUgOC45NTk2MyAxMi42MjkxIDguNzU3MTFDMTIuODI5OCA4LjU1NDU4IDEzLjA2ODIgOC4zOTUzNyAxMy4zMyA4LjI4ODlDMTMuNTkxOSA4LjE4MjQzIDEzLjg3MiA4LjEzMDg2IDE0LjE1MzYgOC4xMzcyN0wxNC43NzU5IDYuNjI5MjVMMTUuNjI2MyA3LjAwMDk0TDE1LjA2MTEgOC4zNDk2N0MxNS40MjkgOC41MjM3IDE1LjczOTEgOC44MDQyOSAxNS45NTMgOS4xNTY3OEMxNi4yMTUgOS41NzQ1OSAxNi4zMjU5IDEwLjA3MzIgMTYuMjY2MiAxMC41NjZDMTYuMjA2NSAxMS4wNTg4IDE1Ljk4MDEgMTEuNTE0NiAxNS42MjYzIDExLjg1NDJDMTUuODQgMTIuMDU3MSAxNi4wMDk2IDEyLjMwMzggMTYuMTIzOSAxMi41NzgzQzE2LjIzODMgMTIuODUyOCAxNi4yOTQ5IDEzLjE0ODggMTYuMjkgMTMuNDQ3MloiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik0wLjAxMzQxODUgNS4yMDAwOUMwLjAzNDU0ODYgNS4wODkzMyAwLjA4NDA0NTkgNC45ODU5NCAwLjE1NzA3NiA0LjkwMDAyQzAuMjMwMTA2IDQuODE0MSAwLjMyNDE3MSA0Ljc0ODU5IDAuNDMwMDg1IDQuNzA5ODlDMC41NjgzNiA0LjY1NzQxIDAuNzIwMTY0IDQuNjUyMzkgMC44NjE2MDIgNC42OTU2NEMxLjAwMzA0IDQuNzM4ODkgMS4xMjYwOCA0LjgyNzk0IDEuMjExMzYgNC45NDg3OEMxLjI5NjY0IDUuMDY5NjIgMS4zMzkzMSA1LjIxNTM5IDEuMzMyNjYgNS4zNjMxNEMxLjMyNjAxIDUuNTEwOSAxLjI3MDQxIDUuNjUyMjQgMS4xNzQ2MyA1Ljc2NDk0QzEuMDc4ODQgNS44Nzc2MyAwLjk0ODI5NCA1Ljk1NTI3IDAuODAzNTQzIDUuOTg1NjNDMC42NTg3OTIgNi4wMTYgMC41MDgwNTMgNS45OTczNyAwLjM3NTA1MSA1LjkzMjY3QzAuMjQyMDQ5IDUuODY3OTggMC4xMzQzMzggNS43NjA4OSAwLjA2ODg2OTUgNS42MjgyN0MwLjAwMzQwMTM2IDUuNDk1NjQgLTAuMDE2MTA1NyA1LjM0NTAyIDAuMDEzNDE4NSA1LjIwMDA5WiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTUuMzYwNyA1LjM4ODhDNS41MzY0NSA1LjMyODk0IDUuNzI1MTQgNS4zMTc0MiA1LjkwNjkgNS4zNTU0N0M2LjA4ODY2IDUuMzkzNTIgNi4yNTY3NiA1LjQ3OTczIDYuMzkzNTEgNS42MDVDNi41NjYzMSA1Ljc5MTMxIDYuNjY0IDYuMDM0NjcgNi42Njc4NSA2LjI4ODM4QzYuNjcxNyA2LjU0MjA4IDYuNTgxNDMgNi43ODgyNyA2LjQxNDM2IDYuOTc5N0M2LjI0NzI5IDcuMTcxMTMgNi4wMTUxOSA3LjI5NDMyIDUuNzYyNTkgNy4zMjU2M0M1LjUxIDcuMzU2OTMgNS4yNTQ3MSA3LjI5NDE1IDUuMDQ1NyA3LjE0OTM0QzQuOTEzMTYgNy4wNDA5NCA0LjgwOTc3IDYuOTAxMzcgNC43NDQ4NiA2Ljc0MzJDNC42Nzk5NSA2LjU4NTAzIDQuNjU1NTYgNi40MTMyNCA0LjY3Mzg5IDYuMjQzMzNDNC42OTYxNCA2LjA1MDkxIDQuNzcyMzkgNS44Njg2NiA0Ljg5Mzg4IDUuNzE3NUM1LjAxNTM4IDUuNTY2MzQgNS4xNzcxOCA1LjQ1MjQxIDUuMzYwNyA1LjM4ODhaIiBmaWxsPSJibGFjayIvPgo8cGF0aCBkPSJNMi4wMDI2MyA3LjI5OTE2QzIuMDA1NzMgNy4xNzQzMSAyLjA0NTA0IDcuMDUzMDYgMi4xMTU3NiA2Ljk1MDI3QzIuMTg2NDcgNi44NDc0NyAyLjI4NTUzIDYuNzY3NTcgMi40MDA4IDYuNzIwMzVDMi40OTQxOCA2LjY4MDQgMi41OTU0IDYuNjYyMjcgMi42OTY3OSA2LjY2NzM0QzIuNzk4MTkgNi42NzI0MSAyLjg5NzEgNi43MDA1NCAyLjk4NjA2IDYuNzQ5NjJDMy4wNzUwMSA2Ljc5ODY5IDMuMTUxNjcgNi44Njc0MSAzLjIxMDI0IDYuOTUwNTlDMy4yNjg4IDcuMDMzNzYgMy4zMDc3NCA3LjEyOTIxIDMuMzI0MSA3LjIyOTcxQzMuMzQwMjkgNy4zMjU1OCAzLjMzNTE0IDcuNDIzODcgMy4zMDkwNCA3LjUxNzUyQzMuMjgyOTMgNy42MTExNyAzLjIzNjUyIDcuNjk3ODcgMy4xNzMxMSA3Ljc3MTQzQzMuMTA5NyA3Ljg0NDk5IDMuMDMwODYgNy45MDM1OCAyLjk0MjI0IDcuOTQzMDFDMi44NTM2MiA3Ljk4MjQ1IDIuNzU3NDEgOC4wMDE3NCAyLjY2MDQ4IDcuOTk5NTNDMi41Njk4NCA4LjAwMjM2IDIuNDc5NjMgNy45ODU4NSAyLjM5NTgyIDcuOTUxMUMyLjMxMjAxIDcuOTE2MzUgMi4yMzY1MSA3Ljg2NDE0IDIuMTc0MzIgNy43OTc5M0MyLjExMjE0IDcuNzMxNzIgMi4wNjQ2NyA3LjY1MzAyIDIuMDM1MDcgNy41NjcwNEMyLjAwNTQ4IDcuNDgxMDYgMS45OTQ0MiA3LjM4OTc1IDIuMDAyNjMgNy4yOTkxNlY3LjI5OTE2WiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTUuMDA4NzQgOS45MTQ3NUM0LjkwNTg0IDkuODU3MDkgNC44MjAwOCA5Ljc3MzE2IDQuNzYwMjEgOS42NzE1M0M0LjcwMDM1IDkuNTY5ODkgNC42Njg1MiA5LjQ1NDE5IDQuNjY3OTggOS4zMzYyNEM0LjY2NzQzIDkuMjE4MjkgNC42OTgxOSA5LjEwMjMgNC43NTcxMiA5LjAwMDEyQzQuODE2MDUgOC44OTc5NCA0LjkwMTAzIDguODEzMjIgNS4wMDM0IDguNzU0NjFDNS4xMDU3NyA4LjY5NjAxIDUuMjIxODUgOC42NjU2MSA1LjMzOTggOC42NjY1MkM1LjQ1Nzc1IDguNjY3NDQgNS41NzMzNSA4LjY5OTYzIDUuNjc0OCA4Ljc1OTgyQzUuNzc2MjQgOC44MiA1Ljg1OTkgOC45MDYwMyA1LjkxNzI0IDkuMDA5MTFDNS45NzQ1OCA5LjExMjE5IDYuMDAzNTQgOS4yMjg2NCA2LjAwMTE3IDkuMzQ2NTdDNS45OTg4NSA5LjQ2MTcxIDUuOTY2NzUgOS41NzQyOSA1LjkwNzk5IDkuNjczMzNDNS44NDkyMyA5Ljc3MjM3IDUuNzY1ODEgOS44NTQ1MSA1LjY2NTg3IDkuOTExNzNDNS41NjU5MyA5Ljk2ODk1IDUuNDUyODcgOS45OTkzIDUuMzM3NzEgOS45OTk4M0M1LjIyMjU0IDEwLjAwMDQgNS4xMDkyMSA5Ljk3MTA1IDUuMDA4NzQgOS45MTQ3NVY5LjkxNDc1WiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTEuNzA2NyA5LjM2NjQ1QzEuOTkxNDIgOS4zMDE5NSAyLjI4OTQ1IDkuMzMyNjcgMi41NTUwMiA5LjQ1MzkxQzIuODIwNTkgOS41NzUxNSAzLjAzOTA0IDkuNzgwMiAzLjE3NjgxIDEwLjAzNzZDMy4zMTQ1OSAxMC4yOTUgMy4zNjQwOCAxMC41OTA1IDMuMzE3NjkgMTAuODc4N0MzLjI3MTMxIDExLjE2NjkgMy4xMzE2IDExLjQzMiAyLjkyMDAzIDExLjYzMzFDMi43NzEyNSAxMS43NzQ2IDIuNTkxODIgMTEuODc5OCAyLjM5NTcxIDExLjk0MDVDMi4xOTk2MSAxMi4wMDEyIDEuOTkyMTMgMTIuMDE1OCAxLjc4OTQ0IDExLjk4MzJDMS41ODY3NiAxMS45NTA2IDEuMzk0MzQgMTEuODcxNiAxLjIyNzE5IDExLjc1MjRDMS4wNjAwNCAxMS42MzMyIDAuOTIyNjc0IDExLjQ3NzEgMC44MjU3OSAxMS4yOTYxQzAuNzI4OTA1IDExLjExNTEgMC42NzUxMjMgMTAuOTE0MiAwLjY2ODYzNSAxMC43MDlDMC42NjIxNDcgMTAuNTAzOCAwLjcwMzEyNyAxMC4yOTk5IDAuNzg4MzgzIDEwLjExMzFDMC44NzM2MzkgOS45MjYzNiAxLjAwMDg3IDkuNzYxODEgMS4xNjAxNSA5LjYzMjNDMS4zMTk0NCA5LjUwMjc5IDEuNTA2NDggOS40MTE4MSAxLjcwNjcgOS4zNjY0NVY5LjM2NjQ1WiIgZmlsbD0iYmxhY2siLz4KPHBhdGggZD0iTTUuMTczMjkgMTEuMzU4QzUuMjkwNTQgMTEuMzI0OSA1LjQxNDcgMTEuMzI1MyA1LjUzMTY5IDExLjM1OTRDNS42NDg2OSAxMS4zOTM0IDUuNzUzODMgMTEuNDU5NSA1LjgzNTIgMTEuNTUwNEM1Ljg5NTc3IDExLjYxOTggNS45NDE0NiAxMS43MDA5IDUuOTY5NDYgMTEuNzg4N0M1Ljk5NzQ1IDExLjg3NjUgNi4wMDcxNCAxMS45NjkyIDUuOTk3OTMgMTIuMDYwOUM1Ljk4ODcxIDEyLjE1MjcgNS45NjA4IDEyLjI0MTUgNS45MTU5IDEyLjMyMkM1Ljg3MTAxIDEyLjQwMjUgNS44MTAxIDEyLjQ3MjkgNS43MzY5NCAxMi41Mjg4QzUuNjYzNzggMTIuNTg0NyA1LjU3OTk0IDEyLjYyNSA1LjQ5MDYxIDEyLjY0NzFDNS40MDEyOCAxMi42NjkzIDUuMzA4MzYgMTIuNjcyOCA1LjIxNzYyIDEyLjY1NzVDNS4xMjY4OCAxMi42NDIxIDUuMDQwMjQgMTIuNjA4MyA0Ljk2MzA5IDEyLjU1ODFDNC44ODU5MyAxMi41MDc4IDQuODE5ODkgMTIuNDQyMyA0Ljc2OTA3IDEyLjM2NTRDNC43MTM0IDEyLjI3NTYgNC42Nzk2MyAxMi4xNzM5IDQuNjcwNDkgMTIuMDY4NUM0LjY2MTM1IDExLjk2MzIgNC42NzcxIDExLjg1NzIgNC43MTY0NyAxMS43NTkxQzQuNzU1ODMgMTEuNjYxIDQuODE3NyAxMS41NzM2IDQuODk3MDYgMTEuNTAzOUM0Ljk3NjQzIDExLjQzNDIgNS4wNzEwNiAxMS4zODQyIDUuMTczMjkgMTEuMzU4VjExLjM1OFoiIGZpbGw9ImJsYWNrIi8+Cjwvc3ZnPgo=';
	}
}


if ( ! function_exists( 'grigora_get_setting' ) ) {

	/**
	 * Get internal setting from option.
	 *
	 * @param string $option Option Name.
	 * @param type   $default Default Option Value.
	 */
	function grigora_get_setting( $option, $default ) {
		$settings_parse = get_option( 'grigora_kit_settings', array() );
		if ( isset( $settings_parse[ $option ] ) ) {
			return $settings_parse[ $option ];
		}
		return $default;
	}
}

if ( ! function_exists( 'grigora_set_setting' ) ) {
	/**
	 * Set internal setting from option.
	 *
	 * @param string $option Option Name.
	 * @param type   $value  Option Value.
	 */
	function grigora_set_setting( $option, $value ) {
		$settings_parse            = get_option( 'grigora_kit_settings', array() );
		$settings_parse[ $option ] = $value;
		update_option( 'grigora_kit_settings', $settings_parse );
		return true;
	}
}

if ( ! function_exists( 'grigora_sanitize_color' ) ) {
	/**
	 * Color sanitize.
	 *
	 * @param string $input Color Value.
	 */
	function grigora_sanitize_color( $input ) {
		if ( '' === $input ) {
			return '';
		}
		if ( false === strpos( $input, 'rgba' ) ) {
			return sanitize_hex_color( $input );
		}
		$input = str_replace( ' ', '', $input );
		sscanf( $input, 'rgba(%d,%d,%d,%f)', $red, $green, $blue, $alpha );
		return 'rgba(' . $red . ',' . $green . ',' . $blue . ',' . $alpha . ')';
	}
}

if ( ! function_exists( 'grigora_string_ends_with' ) ) {
	/**
	 * Check if string ends with.
	 *
	 * @param array $haystack To check against.
	 * @param array $needle   To check.
	 */
	function grigora_string_ends_with( $haystack, $needle ) {
		$length = strlen( $needle );
		if ( ! $length ) {
			return true;
		}
		return substr( $haystack, -$length ) === $needle;
	}
}

if ( ! function_exists( 'grigora_extract_id_array' ) ) {
	/**
	 * Extract ID array from data array
	 *
	 * @param array $array is the array which has objects with key id.
	 */
	function grigora_extract_id_array( $array ) {
		return $array->ID;
	}
}

if ( ! function_exists( 'grigora_extract_value_array' ) ) {
	/**
	 * Extract value array from label array
	 *
	 * @param array $array is the array which has objects with key value.
	 */
	function grigora_extract_value_array( $array ) {
		return $array['value'];
	}
}

if ( ! function_exists( 'grigora_text_trimmer' ) ) {
	/**
	 * Text Trimmer based on length
	 *
	 * @param string $text is the text to be trimmed.
	 * @param int    $max_length is the length to which the text to be trimmed.
	 */
	function grigora_text_trimmer( $text, $max_length ) {
		$text_array        = explode( ' ', $text );
		$text_array_length = count( $text_array );
		array_splice( $text_array, $max_length );
		$spliced_text = join( ' ', $text_array );
		if ( $max_length < $text_array_length ) {
			$spliced_text = $spliced_text . ' ' . "\u{2026}";
		}
		return $spliced_text;
	}
}

if ( ! function_exists( 'grigora_sanitize_post_types' ) ) {
	/**
	 * Post Types sanitize
	 *
	 * @param string $post_type : To check the post type exists or not.
	 */
	function grigora_sanitize_post_types( $post_type ) {
		$post_type_array = get_post_types( array(), 'names', 'and' );
		if ( in_array( $post_type, $post_type_array, true ) ) {
			return $post_type;
		} else {
			return '';
		}
	}
}

if ( ! function_exists( 'grigora_sanitize_order' ) ) {
	/**
	 * Order sanitize
	 *
	 * @param string $order : To check whether order is ASC or DESC.
	 */
	function grigora_sanitize_order( $order ) {
		$order = strtoupper( $order );
		if ( 'ASC' === $order || 'DESC' === $order ) {
			return $order;
		} else {
			return '';
		}
	}
}

if ( ! function_exists( 'grigora_sanitize_author' ) ) {
	/**
	 * Author sanitize
	 *
	 * @param array $author : To check whether author id os int and positive.
	 */
	function grigora_sanitize_author( $author ) {
		$sanitized_author = array();
		foreach ( $author as $val ) {
			if ( is_int( $val ) && $val >= 0 ) {
				array_push( $sanitized_author, $val );
			}
		}
		return $sanitized_author;
	}
}

if ( ! function_exists( 'grigora_sanitize_taxonomy' ) ) {
	/**
	 * Tax Query sanitize
	 *
	 * @param array $taxonomy : contains of array of taxonomies which has to be included.
	 * @param array $taxonomy_exclude : contains of array of taxonomies which has to be excluded.
	 */
	function grigora_sanitize_taxonomy( $taxonomy, $taxonomy_exclude ) {
		$sanitized_tax_query = array();
		if ( count( $taxonomy ) !== 0 ) {
			if ( count( $taxonomy['category']['terms'] ) !== 0 ) {
				$cat_in = array(
					'taxonomy'         => 'category',
					'field'            => 'term_id',
					'terms'            => array(),
					'include_children' => true,
					'operator'         => 'IN',
				);
				foreach ( $taxonomy['category']['terms'] as $val ) {
					if ( is_int( $val ) && $val >= 0 ) {
						array_push( $cat_in['terms'], $val );
					}
				}
				if ( false === $taxonomy['category']['include_children'] ) {
					array_replace( $cat_in, array( 'include_children' => false ) );
				}
				array_push( $sanitized_tax_query, $cat_in );
			}
			if ( count( $taxonomy['tag']['terms'] ) !== 0 ) {
				$tag_in = array(
					'taxonomy' => 'tag',
					'field'    => 'term_id',
					'terms'    => array(),
					'operator' => 'IN',
				);
				foreach ( $taxonomy['tag']['terms'] as $val ) {
					if ( is_int( $val ) && $val >= 0 ) {
						array_push( $tag_in['terms'], $val );
					}
				}
				array_push( $sanitized_tax_query, $tag_in );
			}
		}
		if ( count( $taxonomy_exclude ) !== 0 ) {
			if ( count( $taxonomy_exclude['category']['terms'] ) !== 0 ) {
				$cat_out = array(
					'taxonomy'         => 'category',
					'field'            => 'term_id',
					'terms'            => array(),
					'include_children' => true,
					'operator'         => 'NOT IN',
				);
				foreach ( $taxonomy_exclude['category']['terms'] as $val ) {
					if ( is_int( $val ) && $val >= 0 ) {
						array_push( $cat_out['terms'], $val );
					}
				}
				if ( false === $taxonomy_exclude['category']['include_children'] ) {
					array_replace( $cat_out, array( 'include_children' => false ) );
				}
				array_push( $sanitized_tax_query, $cat_out );
			}
			if ( count( $taxonomy_exclude['tag']['terms'] ) !== 0 ) {
				$tag_out = array(
					'taxonomy' => 'tag',
					'field'    => 'term_id',
					'terms'    => array(),
					'operator' => 'NOT IN',
				);
				foreach ( $taxonomy_exclude['tag']['terms'] as $val ) {
					if ( is_int( $val ) && $val >= 0 ) {
						array_push( $tag_out['terms'], $val );
					}
				}
				array_push( $sanitized_tax_query, $tag_out );
			}
		}
		return $sanitized_tax_query;
	}
}

if ( ! function_exists( 'grigora_sanitize_posts' ) ) {
	/**
	 * Post sanitize
	 *
	 * @param array $include : Checking whether array of post ids belongs to posts array and positive.
	 */
	function grigora_sanitize_posts( $include ) {
		$sanitized_posts = array();
		$posts_array     = get_posts();
		$posts_array     = array_map( 'grigora_extract_id_array', $posts_array );
		foreach ( $include as $val ) {
			if ( is_int( $val ) && $val >= 0 && in_array( $val, $posts_array, true ) ) {
				array_push( $sanitized_include, $val );
			}
		}
		return $sanitized_posts;
	}
}

if ( ! function_exists( 'grigora_sanitize_date' ) ) {
	/**
	 * Date sanitize
	 *
	 * @param string $date : Date input.
	 * @param string $format : formats the date based on input format.
	 */
	function grigora_sanitize_date( $date, $format = 'Y-m-d\TH:i:s' ) {
		$d = DateTime::createFromFormat( $format, $date );
		if ( $d && $d->format( $format ) === $date ) {
			return $date;
		} else {
			return '';
		}
	}
}

if ( ! function_exists( 'grigora_kit_query_results' ) ) {
	/**
	 * Returns all the posts based on the query
	 *
	 * @param string $post_type : Post type.
	 * @param int    $per_page : Number of posts per page.
	 * @param int    $offset : Offset value.
	 * @param string $order : order value.
	 * @param string $orderby : orderby value.
	 * @param string $search : search value.
	 * @param array  $author : array of author ids.
	 * @param array  $author_exclude : array of author ids.
	 * @param array  $taxonomy : array of taxonomies that needs to be included.
	 * @param array  $taxonomy_exclude : array of taxonomies that needs to be excluded.
	 * @param array  $include : array of post ids that needs to be included.
	 * @param array  $exclude : array of post ids that needs to be excluded.
	 * @param array  $after : date value.
	 * @param array  $before : date value.
	 */
	function grigora_kit_query_results( $post_type = 'post', $per_page = 10, $offset = 0, $order = 'ASC', $orderby = 'ID', $search = '', $author = [], $author_exclude = [], $taxonomy = [], $taxonomy_exclude = [], $include = [], $exclude = [], $after = '', $before = '' ) {
		$post_type = grigora_sanitize_post_types( $post_type );
		if ( ! ( 'integer' === gettype( $per_page ) && $per_page > 0 ) ) {
			$per_page = 10;
		}
		if ( ! ( 'integer' === gettype( $offset ) && $offset >= 0 ) ) {
			$offset = 0;
		}
		$order          = grigora_sanitize_order( $order );
		$orderby        = wp_filter_nohtml_kses( $orderby );
		$search         = sanitize_title_for_query( $search );
		$author         = grigora_sanitize_author( $author );
		$author_exclude = grigora_sanitize_author( $author_exclude );
		$tax_query      = grigora_sanitize_taxonomy( $taxonomy, $taxonomy_exclude );
		$include        = grigora_sanitize_posts( $include );
		$exclude        = grigora_sanitize_posts( $exclude );
		$after          = grigora_sanitize_date( $after );
		$before         = grigora_sanitize_date( $before );

		$args = array(
			'post_type'      => $post_type,
			'posts_per_page' => $per_page,
			'offset'         => $offset,
			'order'          => $order,
			'orderby'        => $orderby,
			'search'         => $search,
			'author__in'     => $author,
			'author__not_in' => $author_exclude,
			'tax_query'      => $tax_query,
			'post__in'       => $include,
			'post__not_in'   => $exclude,
			'date_query'     => array(
				'after'     => $after,
				'before'    => $before,
				'inclusive' => true,
			),
		);
		return get_posts( $args );
	}
}
