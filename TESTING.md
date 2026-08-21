# Testing Documentation

## 1. Current Dependency Test

### Input

A package.json containing a dependency whose installed version matches the latest npm version.

### Expected Result

- Dependency identified as Current
- Health score calculated correctly
- No update command required

### Result

PASS

---

## 2. Mixed Dependency Test

### Input

A package.json containing:

- React 19.2.8
- Express 4.18.2

### Expected Result

- React identified as Current
- Express identified as Outdated
- Total dependencies: 2
- Current dependencies: 1
- Outdated dependencies: 1
- Health score: 50/100
- Health status: Needs Attention

### Result

PASS

---

## 3. Real Project package.json Test

### Input

The project's actual client/package.json.

### Result

The tool successfully analyzed 11 dependencies.

Observed result:

- Total: 11
- Current: 4
- Outdated: 7
- Health score: 36/100

### Result

PASS

---

## 4. Invalid JSON Test

### Input

Malformed JSON provided through the paste input.

### Expected Result

The application should display:

"Invalid JSON. Please provide a valid package.json."

### Result

PASS

---

## 5. Dependency Search Test

### Action

Search for:

react

### Expected Result

Only dependency names containing "react" should be displayed.

### Result

PASS

---

## 6. Dependency Filter Test

### Action

Select the "Outdated" filter.

### Expected Result

Only outdated dependencies should be displayed.

### Result

PASS

---

## 7. Update Command Test

### Action

Check an outdated dependency.

### Expected Result

The application generates an npm command such as:

npm install package-name@latest-version

The Copy button should copy the command to the clipboard.

### Result

PASS

---

## 8. npm Lookup Failure Handling

### Purpose

Verify that the application does not crash if an npm package cannot be retrieved.

### Expected Result

The dependency should be handled as an unknown dependency instead of crashing the complete analysis.

### Result

PASS / NOT TESTED