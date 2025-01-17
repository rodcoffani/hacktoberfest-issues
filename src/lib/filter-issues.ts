import type { FilterItems } from '../components/Forms/FilterForm';
import type { Issue } from '../types';

export const FILTER_ISSUES = (filters: FilterItems) => {
  return (issue: Issue) => {
    const { goodFirstIssue, unassignedIssue, language } = filters;
    if (!goodFirstIssue && !unassignedIssue && (!language || language === '__NONE')) {
      return true;
    }

    const issue_labels = (issue.labels.nodes || []).map((label) => label.name.toLowerCase()) || [];
    const issue_total_assignees = issue.assignees.totalCount;
    const issue_repo_languages = (issue.repository.languages.nodes || []).map((lang) => lang.name.toLowerCase()) || [];

    if (
      (goodFirstIssue &&
        issue_labels.length > 0 &&
        (issue_labels.includes('good first issue') || issue_labels.includes('good-first-issue'))) ||
      (unassignedIssue && issue_total_assignees == 0) ||
      (language && issue_repo_languages.length > 0 && issue_repo_languages.includes(language.toLowerCase()))
    ) {
      return true;
    }

    return false;
  };
};
