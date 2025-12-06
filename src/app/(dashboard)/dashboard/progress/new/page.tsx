'use client';

import { ArrowLeft, Plus, Trash2, GripVertical } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

interface Milestone {
  id: string;
  name: string;
}

interface Skill {
  id: string;
  name: string;
  description: string;
  targetMetric: string;
  milestones: Milestone[];
}

interface Level {
  id: string;
  name: string;
  description: string;
  skills: Skill[];
}

export default function NewProgressionPathPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [levels, setLevels] = useState<Level[]>([
    {
      id: '1',
      name: 'Level 1',
      description: '',
      skills: [
        {
          id: '1-1',
          name: '',
          description: '',
          targetMetric: '',
          milestones: [{ id: 'm1', name: '' }],
        },
      ],
    },
  ]);

  const addLevel = () => {
    const newLevel: Level = {
      id: `${Date.now()}`,
      name: `Level ${levels.length + 1}`,
      description: '',
      skills: [
        {
          id: `${Date.now()}-1`,
          name: '',
          description: '',
          targetMetric: '',
          milestones: [{ id: `m-${Date.now()}`, name: '' }],
        },
      ],
    };
    setLevels([...levels, newLevel]);
  };

  const removeLevel = (levelId: string) => {
    if (levels.length > 1) {
      setLevels(levels.filter((l) => l.id !== levelId));
    }
  };

  const updateLevel = (levelId: string, field: keyof Level, value: string) => {
    setLevels(
      levels.map((l) => (l.id === levelId ? { ...l, [field]: value } : l))
    );
  };

  const addSkill = (levelId: string) => {
    setLevels(
      levels.map((l) =>
        l.id === levelId
          ? {
              ...l,
              skills: [
                ...l.skills,
                {
                  id: `${Date.now()}`,
                  name: '',
                  description: '',
                  targetMetric: '',
                  milestones: [{ id: `m-${Date.now()}`, name: '' }],
                },
              ],
            }
          : l
      )
    );
  };

  const removeSkill = (levelId: string, skillId: string) => {
    setLevels(
      levels.map((l) =>
        l.id === levelId
          ? { ...l, skills: l.skills.filter((s) => s.id !== skillId) }
          : l
      )
    );
  };

  const updateSkill = (levelId: string, skillId: string, field: keyof Skill, value: string) => {
    setLevels(
      levels.map((l) =>
        l.id === levelId
          ? {
              ...l,
              skills: l.skills.map((s) =>
                s.id === skillId ? { ...s, [field]: value } : s
              ),
            }
          : l
      )
    );
  };

  const addMilestone = (levelId: string, skillId: string) => {
    setLevels(
      levels.map((l) =>
        l.id === levelId
          ? {
              ...l,
              skills: l.skills.map((s) =>
                s.id === skillId
                  ? {
                      ...s,
                      milestones: [
                        ...s.milestones,
                        { id: `m-${Date.now()}`, name: '' },
                      ],
                    }
                  : s
              ),
            }
          : l
      )
    );
  };

  const removeMilestone = (levelId: string, skillId: string, milestoneId: string) => {
    setLevels(
      levels.map((l) =>
        l.id === levelId
          ? {
              ...l,
              skills: l.skills.map((s) =>
                s.id === skillId
                  ? {
                      ...s,
                      milestones: s.milestones.filter((m) => m.id !== milestoneId),
                    }
                  : s
              ),
            }
          : l
      )
    );
  };

  const updateMilestone = (
    levelId: string,
    skillId: string,
    milestoneId: string,
    value: string
  ) => {
    setLevels(
      levels.map((l) =>
        l.id === levelId
          ? {
              ...l,
              skills: l.skills.map((s) =>
                s.id === skillId
                  ? {
                      ...s,
                      milestones: s.milestones.map((m) =>
                        m.id === milestoneId ? { ...m, name: value } : m
                      ),
                    }
                  : s
              ),
            }
          : l
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    router.push('/dashboard/progress');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/progress">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create Progression Path</h1>
          <p className="text-muted-foreground">
            Define levels, skills, and milestones for student development
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Basic Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Name and categorize your progression path</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Path Name *</Label>
                <Input id="name" placeholder="e.g., Junior Development" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Player Category *</Label>
                <Select defaultValue="recreational">
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recreational">Recreational</SelectItem>
                    <SelectItem value="competitive_junior">Competitive Junior</SelectItem>
                    <SelectItem value="collegiate_track">Collegiate Track</SelectItem>
                    <SelectItem value="professional_track">Professional Track</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the goals and target audience for this path..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Levels */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Levels</h2>
            <Button type="button" variant="outline" onClick={addLevel}>
              <Plus className="mr-2 h-4 w-4" />
              Add Level
            </Button>
          </div>

          {levels.map((level, levelIndex) => (
            <Card key={level.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="cursor-move">
                      <GripVertical className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                      {levelIndex + 1}
                    </div>
                    <Input
                      value={level.name}
                      onChange={(e) => updateLevel(level.id, 'name', e.target.value)}
                      className="max-w-[200px]"
                      placeholder="Level name"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeLevel(level.id)}
                    disabled={levels.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  value={level.description}
                  onChange={(e) => updateLevel(level.id, 'description', e.target.value)}
                  placeholder="Brief description of this level"
                  className="mt-2"
                />
              </CardHeader>
              <CardContent className="space-y-4">
                {level.skills.map((skill, skillIndex) => (
                  <div key={skill.id}>
                    {skillIndex > 0 && <Separator className="mb-4" />}
                    <div className="space-y-4 rounded-lg border p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-4">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label>Skill Name *</Label>
                              <Input
                                value={skill.name}
                                onChange={(e) =>
                                  updateSkill(level.id, skill.id, 'name', e.target.value)
                                }
                                placeholder="e.g., Forehand Grip"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Target Metric</Label>
                              <Input
                                value={skill.targetMetric}
                                onChange={(e) =>
                                  updateSkill(level.id, skill.id, 'targetMetric', e.target.value)
                                }
                                placeholder="e.g., 90% consistency"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Description</Label>
                            <Input
                              value={skill.description}
                              onChange={(e) =>
                                updateSkill(level.id, skill.id, 'description', e.target.value)
                              }
                              placeholder="Brief description of this skill"
                            />
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSkill(level.id, skill.id)}
                          disabled={level.skills.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Milestones */}
                      <div className="space-y-2">
                        <Label>Milestones</Label>
                        <div className="space-y-2">
                          {skill.milestones.map((milestone) => (
                            <div key={milestone.id} className="flex items-center gap-2">
                              <Input
                                value={milestone.name}
                                onChange={(e) =>
                                  updateMilestone(level.id, skill.id, milestone.id, e.target.value)
                                }
                                placeholder="Milestone description"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeMilestone(level.id, skill.id, milestone.id)}
                                disabled={skill.milestones.length === 1}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => addMilestone(level.id, skill.id)}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Milestone
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addSkill(level.id)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Skill
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline" type="button" asChild>
            <Link href="/dashboard/progress">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Path'}
          </Button>
        </div>
      </form>
    </div>
  );
}
