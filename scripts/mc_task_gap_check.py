#!/usr/bin/env python3
import pathlib
import datetime
import sys

def gather_files(directory: pathlib.Path):
    if not directory.exists():
        return []
    return sorted([p for p in directory.iterdir() if p.is_file()])

def inspect_file(path: pathlib.Path, now: datetime.datetime):
    text = path.read_text(errors="ignore")
    contains_review = "@reviewed" in text.lower()
    mtime = datetime.datetime.fromtimestamp(path.stat().st_mtime, datetime.timezone.utc)
    age = now - mtime
    return {
        "name": str(path.relative_to(path.parents[0])) if path.parent else path.name,
        "path": str(path),
        "age": age,
        "reviewed": contains_review,
    }

def summarize(obs, threshold_days=7):
    stale = [o for o in obs if o["age"] > datetime.timedelta(days=threshold_days)]
    unreviewed = [o for o in obs if not o["reviewed"]]
    return stale, unreviewed

def main():
    workspace = pathlib.Path("/home/ubuntu/.openclaw/workspace")
    now = datetime.datetime.now(datetime.timezone.utc)
    report = []
    sources = ["memory/working", "memory/advisory"]
    all_obs = []

    for source in sources:
        directory = workspace / source
        obs = []
        for path in gather_files(directory):
            data = inspect_file(path, now)
            obs.append(data)
            report.append(
                f"{source}: {path.name} (age={data['age'].days}d, reviewed={'yes' if data['reviewed'] else 'no'})"
            )
        all_obs.extend(obs)

    stale, unreviewed = summarize(all_obs)
    summary = []
    summary.append(f"Mission Control Task Gap Check — {now.strftime('%Y-%m-%dT%H:%M:%SZ')}")
    summary.append(f"Total files scanned: {len(all_obs)}")
    summary.append(f"Stale files (>7d): {len(stale)}")
    summary.append(f"Unreviewed files: {len(unreviewed)}")
    if stale:
        summary.append("Stale list:")
        for item in stale:
            summary.append(f"  - {item['path']} (age={item['age'].days}d)")
    if unreviewed:
        summary.append("Unreviewed list:")
        for item in unreviewed:
            summary.append(f"  - {item['path']}")

    log_dir = workspace / "logs"
    log_dir.mkdir(exist_ok=True)
    log_path = log_dir / "mc_task_gap_check.log"
    with open(log_path, "a", encoding="utf-8") as log_f:
        log_f.write("\n".join(summary))
        log_f.write("\n" * 2)

    report_dir = workspace / "memory" / "working"
    report_dir.mkdir(parents=True, exist_ok=True)
    timestamp = now.strftime("%Y-%m-%dT%H%M%SZ")
    report_path = report_dir / f"mc_task_gap_check-{timestamp}.md"
    with open(report_path, "w", encoding="utf-8") as report_f:
        report_f.write("\n".join(summary) + "\n\n")
        report_f.write("Detailed scan:\n")
        for line in report:
            report_f.write(f"- {line}\n")

    if stale or unreviewed:
        print("Task gaps detected; see", report_path)
    else:
        print("No gaps detected.")

if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print("Error during task gap check:", exc, file=sys.stderr)
        raise
