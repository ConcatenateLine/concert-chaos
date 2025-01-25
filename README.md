# Concert Chaos

The Concert Chaos is a web application that simulates a circuit for packages transportation using a canvas to draw the circuit and the packages. The game's objective is to not block or saturate the transportation circuit with the packages.

## Project Structure

The project is structured in the following folders:

src/
├── App.tsx
├── assets/
│ └── react.svg
├── components/
│ ├── Footer.container.tsx
│ ├── Header.container.tsx
│ └── Sidebar.component.tsx
├── features/
│ ├── TransportationBand/
│ │ └── TransportationBand.container.tsx
│ ├── auth/
│ │ ├── Auth.container.tsx
│ │ ├── interfaces/ (empty)
│ │ └── services/
│ │ └── Auth.service.ts
│ ├── box/
│ │ ├── Box.container.tsx
│ │ └── components/
│ │ └── BoxDraw.component.tsx
│ ├── dashboard/
│ │ ├── Dashboard.container.tsx
│ │ └── components/
│ │ ├── Container.component.tsx
│ │ └── Item.component.tsx
│ └── platform/
│ └── Platform.container.tsx
├── index.css
├── main.tsx
└── vite-env.d.ts

## Technologies

The game uses the following technologies:

- **Vite**: development server
- **React**: for the user interface
- **TypeScript**: for the type safety
- **Tailwind CSS**: for the styling
- **Canvas**: for drawing the circuit and the packages

## Game play

The game is easy to play. The canvas is used to draw the circuit and the packages. The player has to click the platforms on the canvas to add a package to the circuit. The package will be drawn on the canvas and move to the next platform. The player has to click on the canvas again to add a new package. The game will end when the player cannot add a new package to the circuit without blocking or saturating the transportation circuit.

## Execute the project

1. Clone the project
2. Run `npm install` to install the packages
3. Run `npm run dev` to start the project
4. Open `http://localhost:3000` in your browser

## To Do List

- ...
