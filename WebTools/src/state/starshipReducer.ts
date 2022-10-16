import { SimpleStats, Starship } from "../common/starship";
import { ShipBuildWorkflow } from "../starship/model/shipBuildWorkflow";
import { ADD_STARSHIP_WEAPON, CHANGE_STARSHIP_SCALE, CHANGE_STARSHIP_SIMPLE_CLASS_NAME, CHANGE_STARSHIP_SIMPLE_DEPARTMENT, CHANGE_STARSHIP_SIMPLE_SYSTEM, CREATE_NEW_STARSHIP, DELETE_STARSHIP_WEAPON, NEXT_STARSHIP_WORKFLOW_STEP, REWIND_TO_STARSHIP_WORKFLOW_STEP, SET_ADDITIONAL_TALENTS, SET_STARSHIP_NAME, SET_STARSHIP_REGISTRY, SET_STARSHIP_TRAITS } from "./starshipActions";

interface StarshipState {
    starship?: Starship;
    workflow?: ShipBuildWorkflow;
}

const starshipReducer = (state: StarshipState = { starship: undefined, workflow: undefined }, action) => {
    switch (action.type) {
        case CREATE_NEW_STARSHIP: {
            let s = new Starship();
            s.type = action.payload.type;
            s.serviceYear = action.payload.serviceYear;
            if (action.payload.buildType != null) {
                s.buildType = action.payload.buildType;
            }
            if (action.payload.simple) {
                s.simpleStats = new SimpleStats();
                s.simpleStats.scale = action.payload.simple.scale;
                s.simpleStats.systems = [...action.payload.simple.systems];
                s.simpleStats.departments = [...action.payload.simple.departments];
                s.simpleStats.className = action.payload.simple.className;
            }
            return {
                ...state,
                starship: s,
                workflow: action.payload.workflow
            }
        }
        case CHANGE_STARSHIP_SCALE: {
            let s = state.starship.copy();
            if (s.simpleStats == null) {
                s.simpleStats = new SimpleStats();
            }
            s.simpleStats.scale += action.payload.delta;
            return {
                ...state,
                starship: s
            }
        }
        case CHANGE_STARSHIP_SIMPLE_CLASS_NAME: {
            let s = state.starship.copy();
            if (s.simpleStats == null) {
                s.simpleStats = new SimpleStats();
            }
            s.simpleStats.className = action.payload.className;
            return {
                ...state,
                starship: s
            }
        }
        case SET_STARSHIP_NAME: {
            let s = state.starship.copy();
            s.name = action.payload.name;
            return {
                ...state,
                starship: s
            }
        }
        case SET_STARSHIP_REGISTRY: {
            let s = state.starship.copy();
            s.registry = action.payload.registry;
            return {
                ...state,
                starship: s
            }
        }
        case SET_STARSHIP_TRAITS: {
            let s = state.starship.copy();
            s.traits = action.payload.traits;
            return {
                ...state,
                starship: s
            }
        }
        case SET_ADDITIONAL_TALENTS: {
            let s = state.starship.copy();
            s.additionalTalents = [...action.payload.talents];
            return {
                ...state,
                starship: s
            }
        }
        case ADD_STARSHIP_WEAPON: {
            let s = state.starship.copy();
            s.additionalWeapons.push(action.payload.weapon);
            return {
                ...state,
                starship: s
            }
        }
        case DELETE_STARSHIP_WEAPON: {
            let s = state.starship.copy();
            if (s.additionalWeapons.indexOf(action.payload.weapon) >= 0) {
                s.additionalWeapons.splice(s.additionalWeapons.indexOf(action.payload.weapon), 1);
            }
            return {
                ...state,
                starship: s
            }
        }
        case CHANGE_STARSHIP_SIMPLE_SYSTEM: {
            let s = state.starship.copy();
            if (s.simpleStats == null) {
                s.simpleStats = new SimpleStats();
            }
            s.simpleStats.systems[action.payload.system] += action.payload.delta;
            return {
                ...state,
                starship: s
            }
        }
        case CHANGE_STARSHIP_SIMPLE_DEPARTMENT: {
            let s = state.starship.copy();
            if (s.simpleStats == null) {
                s.simpleStats = new SimpleStats();
            }
            s.simpleStats.departments[action.payload.department] += action.payload.delta;
            return {
                ...state,
                starship: s
            }
        }
        case NEXT_STARSHIP_WORKFLOW_STEP: {
            if (state.workflow) {
                let w = new ShipBuildWorkflow(state.workflow.steps);
                w.currentStepIndex = state.workflow.currentStepIndex + 1;
                return {
                    ...state,
                    workflow: w
                }
            } else {
                return
            }
        }
        case REWIND_TO_STARSHIP_WORKFLOW_STEP: {
            if (state.workflow) {
                let w = new ShipBuildWorkflow(state.workflow.steps);
                w.currentStepIndex = action.payload.index;
                return {
                    ...state,
                    workflow: w
                }
            } else {
                return
            }
        }
        default:
            return state;
    }
};

export default starshipReducer;