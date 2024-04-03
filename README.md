### Checkers Game Development Guide

## Running backend site of the project

To run backend site of the project, type following command in console from Checkers dir:

```bash
  cd backend
  npm run server:start
```

You need to restart server after every change made directly in code.

## Running frontend

To run frontend site of the project, type following command in console from Checkers dir:

```bash
  cd frontend
  npm run front:start
```

Frontend site is refreshing realtime, you don't need to restart it after changes in code.

## Branches naming and rules

main is default branch on the project, but it has protection that don't allow force pushes or directly plain pushes into it.
You need to create an another branch, then made a pull request into dev, then from dev to main to merge your changes into it.
Branch name should have one from the following prefixes:

```
  feature/<your-name-here>
  fix/<your-name-here>
  test/<your-name-here>
```

You will need also add a reviewers into pull request before successfully merge on pull request
